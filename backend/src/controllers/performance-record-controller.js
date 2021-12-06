const orderEvaluationApi = require("../apis/order-evaluation-api");
const socialPerformanceApi = require("../apis/social-performance-api");
const salesmanApi = require("../apis/salesman-api");
const PerformanceRecord = require("../models/PerformanceRecord")

exports.getPerformanceRecord = async function(req, res) {
    const sid = req.params.sid;
    const orderEvaluation = await orderEvaluationApi.getOrderEvaluationsObject(sid);
    const socialPerformance = await socialPerformanceApi.getSocialPerformanceObject(req, sid);
    const salesman = await salesmanApi.getEmployeeObject(sid);

    const performanceRecord = new PerformanceRecord(salesman, orderEvaluation, socialPerformance);
    return res.send(performanceRecord);
}