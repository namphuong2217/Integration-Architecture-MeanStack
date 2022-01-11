const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("./employee-controller");
const socialPerformanceController = require("../controllers/social-performance-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

const BonusCompCollection = require("../models/BonusCompCollection");
const OrderEvaluationEval = require("../models/OrderEvaluationEval");
const SocialPerformanceEval = require("../models/SocialPerformanceEval");
const SalesMan = require("../models/Employee");

const {hasRoleHR, hasRoleCEO} = require("../Globals");

exports.getBonusComputationCollection = async function(sid, year, db) {

    // If the collection is already in database
    const bonusCompCollection = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    if(bonusCompCollection){
        return bonusCompCollection;
    }

    // Collect data from different controllers
    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid, year);
    const socialPerformance = await socialPerformanceController.getSocialPerformance(sid, year, db);
    const salesman = await salesmanController.getEmployee(sid);

    // Enrich the given data with bonus and comment
    const ergOrder = OrderEvaluationEval.fromOrderEvaluation(orderEvaluation);
    const ergSocial = SocialPerformanceEval.fromSocialPerformance(socialPerformance);


    return new BonusCompCollection(parseInt(salesman.sid), parseInt(year), salesman, ergOrder.listOrderEval,
                                    ergSocial.socialPerformance,false, false, ergOrder.bonusSum, ergSocial.bonusSum);
}

exports.postBonusComputationCollection = async function(body, db, user){

    const bonusCompCollectionDB = await bonusCompCollectionService.readBonusCompCollection(body.sid, body.year, db);
    //if not in database, save data in DB
    if(!bonusCompCollectionDB && (hasRoleHR(user) || hasRoleCEO(user))){
        let listOrderEval = [];
        body.orderEvaluation.forEach(orderEval => {
            listOrderEval.push(new OrderEvaluationEval(orderEval.nameProduct, orderEval.client, orderEval.clientRanking,
                orderEval.items, orderEval.bonus, orderEval.comment))
        })
        const socialPerformanceEval = new SocialPerformanceEval(body.socialPerformance);
        const salesMan = new SalesMan(parseInt(body.salesman.sid), body.salesman.first_name, body.salesman.last_name, body.salesman.department);
        const bonusCompCollection = new BonusCompCollection(salesMan.sid, body.year, salesMan, listOrderEval,
            socialPerformanceEval, hasRoleCEO(user), hasRoleHR(user), body.bonusOrder, body.bonusSocial, body.bonusTotal);
        return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
    }

    // if already in database, update data in DB
    // if already approved
    if((bonusCompCollectionDB.approvedByHR && hasRoleHR(user)) ||
        (bonusCompCollectionDB.approvedByCEO && hasRoleCEO(user)) ){
        return JSON.stringify({status: "error", message: `collection is already approved`});
    }
    //HR
    if(hasRoleHR(user)){
        return await bonusCompCollectionService.updateBonusCompCollection(body.sid, body.year, {"approvedByHR" : true}, db);
    }
    //CEO
    else if(hasRoleCEO(user)){
        return await bonusCompCollectionService.updateBonusCompCollection(body.sid, body.year, createCEOupdate(bonusCompCollectionDB, body), db);
    }

    //Post Bonus on OrangeHRM
    if(body.approvedByCEO && body.approvedByHR){
        await salesmanController.postEmployeeBonus(body.sid, body.year, body.bonusTotal);
    }
}


//HELPER FUNCTIONS


const createCEOupdate = function (bonusCompCollectionDB, bonusCompCollectionUpdate){
    const updatedCEO = {"approvedByCEO" : true};
    const updateSocial = createCommentUpdateSocialPerformance(bonusCompCollectionDB.socialPerformance, bonusCompCollectionDB.socialPerformance);
    const updateOrder = createCommentUpdateOrderEvaluation(bonusCompCollectionDB.orderEvaluation, bonusCompCollectionDB.orderEvaluation);
    if(updateOrder && updateSocial){
        return {updatedCEO, updateSocial, updateOrder};
    }
    if(updateOrder){ return {updatedCEO, updateOrder};}
    if(updateSocial){ return {updatedCEO, updateSocial};}
}

const createCommentUpdateSocialPerformance = function(socialPerformanceDB, socialPerformanceUpdate){
    if(socialPerformanceDB){
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
        for(const [i, val] of orderEvaluationDB){
            orderEvalComment[`orderEvaluation.${i}.comment`] = orderEvaluationUpdate[i].comment;
        }
        return orderEvalComment;
    }
}

