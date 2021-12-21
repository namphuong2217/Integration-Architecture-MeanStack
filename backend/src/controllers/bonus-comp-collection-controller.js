const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("../controllers/salesman-controller");
const socialPerformanceController = require("../controllers/social-performance-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

const BonusCompCollection = require("../models/BonusCompCollection")

exports.getBonusComputationCollection = async function(sid, year, db) {

    const bonusCompCollection = await bonusCompCollectionService.getBonusCompCollection(sid, year, db);
    if(bonusCompCollection){
        return bonusCompCollection;
    }

    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid, year);
    const socialPerformance = await socialPerformanceController.getSocialPerformance(sid, year, db);
    const salesman = await salesmanController.getEmployee(sid);

    const performanceRecord = new BonusCompCollection(salesman, orderEvaluation, socialPerformance);
    return performanceRecord;
}

