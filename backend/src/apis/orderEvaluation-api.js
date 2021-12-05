//const SalesMan = require("../models/SalesMan")
const orderEvaluationService = require("../services/orderEvaluation-service");
const orderEvaluationFilter = require("./filter/orderEvaluation-filter");

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
    if(filteredOrderEvaluations.length === 0){return res.send("{status: error}")};

    return res.send(filteredOrderEvaluations);
}
