//const SalesMan = require("../models/SalesMan")
const orderEvaluationService = require("../services/orderEvaluation-service");

exports.getOrderEvaluations = async function(req, res) {
    const oid = req.params.oid;
    const resp = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.getOrderEvaluation = async function(req, res) {
    const oid = req.params.oid;
    const resp = await orderEvaluationService.orderEvaluationsRead(oid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}