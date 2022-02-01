const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("./employee-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

const BonusCompCollection = require("../models/BonusCompCollection");
const SalesMan = require("../models/Employee");

const socialPerformanceTargetService = require("../services/social-performance-target-service");

const {hasRoleHR, hasRoleCEO, hasRoleSales} = require("../Globals");
const socialPerformanceService = require("../services/social-performance-service");
const bonusCalcEnricher = require("./transformation/bonus-calculation-enricher");

exports.getBonusComputationCollection = async function(sid, year, db) {
    year=parseInt(year);
    // If the collection is already in database
    const bonusCompCollection = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    if(bonusCompCollection){
        return bonusCompCollection;
    }

    // Collect data from different controllers
    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid, year);
    const socialPerformance = await socialPerformanceService.getYearAverage(db, sid, year);
    const salesman = await salesmanController.getEmployee(sid);

    const bonusOrder=[];
    orderEvaluation.forEach(orderEval => {
        bonusOrder.push(bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking, orderEval.items));
    });

    const target = await socialPerformanceTargetService.get(db, sid, year);
    const bonusSocial=[];
    if(target.status === 200){
        Object.keys(socialPerformance).filter(key => key != "sid" && key !="year").forEach(socialKey =>{
            bonusSocial.push(bonusCalcEnricher.getBonusForSocialPerformance(socialKey, target.payload[socialKey], socialPerformance[socialKey]));
        });
    }

    return new BonusCompCollection(year, salesman, orderEvaluation,
        socialPerformance,false, false, bonusOrder, bonusSocial);
}

exports.postBonusComputationCollection = async function(body, db, user){

    const bonusCompCollectionDB = await bonusCompCollectionService.readBonusCompCollection(body.sid, body.year, db);

    //if not in database, save data in DB
    if(!bonusCompCollectionDB && (hasRoleHR(user) || hasRoleCEO(user))){
        let listOrderEval = [];
        body.orderEvaluation.forEach(orderEval => {
            listOrderEval.push(new OrderEvaluationEval(orderEval.nameProduct, orderEval.client, orderEval.clientRanking,
                orderEval.items, orderEval.bonus, hasRoleCEO(user) ? orderEval.comment : ""))
        })
        const socialPerformanceEval = new SocialPerformanceEval(body.socialPerformance, hasRoleCEO(user));
        const salesMan = new SalesMan(parseInt(body.salesman.sid), body.salesman.first_name, body.salesman.last_name, body.salesman.department);
        const bonusCompCollection = new BonusCompCollection(salesMan.sid, body.year, salesMan, listOrderEval,
            socialPerformanceEval, hasRoleCEO(user), hasRoleHR(user), body.bonusOrder, body.bonusSocial, body.bonusTotal);
        return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
    }

    // if already in database, update data in DB
    // if user already approved
    if((bonusCompCollectionDB.approvedByHR && hasRoleHR(user)) ||
        (bonusCompCollectionDB.approvedByCEO && hasRoleCEO(user)) ){
        return JSON.stringify({status: "error", message: `collection is already approved`});
    }
    //approve of HR
    else if(hasRoleHR(user)){
        await salesmanController.postEmployeeBonus(body.sid, body.year, body.bonusTotal); // post bonus on OHRM
        return await bonusCompCollectionService.updateBonusCompCollection(body.sid, body.year, {"approvedByHR" : true}, db);
    }
    //approve of CEO
    else if(hasRoleCEO(user)){
        await salesmanController.postEmployeeBonus(body.sid, body.year, body.bonusTotal); // post bonus on OHRM
        const ceoUpdate = createCEOupdate(bonusCompCollectionDB, body);
        return await bonusCompCollectionService.updateBonusCompCollection(body.sid, body.year, ceoUpdate, db);
    }

}


//HELPER FUNCTIONS


const createCEOupdate = function (bonusCompCollectionDB, bonusCompCollectionUpdate){
    const updatedCEO = {"approvedByCEO" : true};
    const updateSocial = createCommentUpdateSocialPerformance(bonusCompCollectionDB.socialPerformance, bonusCompCollectionUpdate.socialPerformance);
    const updateOrder = createCommentUpdateOrderEvaluation(bonusCompCollectionDB.orderEvaluation, bonusCompCollectionUpdate.orderEvaluation);
    if(updateOrder && updateSocial){
        return {...updatedCEO, ...updateSocial, ...updateOrder};
    }
    if(updateOrder){ return {...updatedCEO, ...updateOrder};}
    if(updateSocial){ return {...updatedCEO, ...updateSocial};}
}

const createCommentUpdateSocialPerformance = function(socialPerformanceDB, socialPerformanceUpdate){
    if(socialPerformanceDB.sid){
        return {
                "socialPerformance.leadership_competence.comment" : socialPerformanceUpdate.leadership_competence.comment,
                "socialPerformance.openness.comment" : socialPerformanceUpdate.openness.comment,
                "socialPerformance.social_behaviour.comment" : socialPerformanceUpdate.social_behaviour.comment,
                "socialPerformance.attitude.comment" : socialPerformanceUpdate.attitude.comment,
                "socialPerformance.comm_skills.comment" : socialPerformanceUpdate.comm_skills.comment,
                "socialPerformance.integrity.comment" : socialPerformanceUpdate.integrity.comment,
        }
    }
}

const createCommentUpdateOrderEvaluation = function(orderEvaluationDB, orderEvaluationUpdate){
    if(orderEvaluationDB.length){
        let orderEvalComment ={};
        for(let i = 0; i< orderEvaluationDB.length; ++i){
            orderEvalComment[`orderEvaluation.${i}.comment`] = orderEvaluationUpdate[i].comment;
        }
        return orderEvalComment;
    }
}

