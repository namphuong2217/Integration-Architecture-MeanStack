const orderEvaluationService = require("../services/order-evaluation-service");
const orderEvaluationFilter = require("./filter/order-evaluation-filter");

exports.getOrderEvaluations = async function(sid){

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

    //filter OrderEvaluations
    const filteredOrderEvaluations = await orderEvaluationFilter.filterOrderEvaluationBySid(sid, respEvaluationRecords, respAccounts);

    return filteredOrderEvaluations;
}