const orderEvaluationService = require("../services/order-evaluation-service");
const orderEvaluationFilter = require("./filter/order-evaluation-filter");

exports.getOrderEvaluations = async function(req, res) {
    const sid = req.params.sid;

    // get evaluation records from OpenCRX
    const respEvaluationRecords = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {
            console.log(error);
        });

    //get accounts from OrangeHRM
    const respAccounts = await orderEvaluationService.accountsRead()
        .catch((error) => {
            console.log(error);
        });

    //get OrderEvaluations
    const filteredOrderEvaluations = orderEvaluationFilter.filterOrderEvaluationBySid(sid, respEvaluationRecords, respAccounts);

    return res.send(filteredOrderEvaluations);
}

exports.getOrderEvaluationsObject = async function(sid){

    // get evaluation records from OpenCRX
    const respEvaluationRecords = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {
            console.log(error);
        });

    //get accounts from OrangeHRM
    const respAccounts = await orderEvaluationService.accountsRead()
        .catch((error) => {
            console.log(error);
        });

    //get OrderEvaluations
    const filteredOrderEvaluations = orderEvaluationFilter.filterOrderEvaluationBySid(sid, respEvaluationRecords, respAccounts);

    return filteredOrderEvaluations;
}
