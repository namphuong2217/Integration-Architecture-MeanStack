const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("../controllers/salesman-controller");
const socialPerformanceController = require("../controllers/social-performance-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

const BonusCompCollection = require("../models/BonusCompCollection");
const OrderEvaluationEval = require("../models/OrderEvaluationEval");
const SocialPerformanceEval = require("../models/SocialPerformanceEval");
const SalesMan = require("../models/SalesMan");

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

exports.postBonusComputationCollection = async function(body, db){
    let listOrderEval = [];
    body.orderEvaluation.forEach(orderEval => {
        listOrderEval.push(new OrderEvaluationEval(orderEval.nameProduct, orderEval.client, orderEval.clientRanking,
                                                orderEval.items, orderEval.bonus, orderEval.comment))
    })
    const socialPerformanceEval = new SocialPerformanceEval(body.socialPerformance);
    const salesMan = new SalesMan(parseInt(body.salesman.sid), body.salesman.first_name, body.salesman.last_name, body.salesman.department);
    const bonusCompCollection = new BonusCompCollection(salesMan.sid, socialPerformanceEval.year, salesMan, listOrderEval,
            socialPerformanceEval, body.approvedByCEO, body.approvedByHR, body.bonusOrder, body.bonusSocial, body.bonusTotal);
    return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
}

