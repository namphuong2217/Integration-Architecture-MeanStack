const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("../controllers/salesman-controller");
const socialPerformanceApi = require("../apis/social-performance-api");

const BonusCompCollection = require("../models/BonusCompCollection")

exports.getPerformanceRecord = async function(req, sid) {
    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid);
    const socialPerformance = await socialPerformanceApi.getSocialPerformanceObject(req, sid);
    const salesman = await salesmanController.getEmployee(sid);

    const performanceRecord = new BonusCompCollection(salesman, orderEvaluation, socialPerformance);
    return performanceRecord;
}