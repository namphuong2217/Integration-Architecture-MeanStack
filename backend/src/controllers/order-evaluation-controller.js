const orderEvaluationService = require("../services/order-evaluation-service");
const orderEvaluationFilter = require("./transformation/order-evaluation-transformation");

exports.getOrderEvaluations = async function(sid, year){

    // get evaluation records from OpenCRX
    const respEvaluationRecords = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {
            console.log(error);
        });

    //get accounts from OpenCRX
    const respAccounts = await orderEvaluationService.accountsRead()
        .catch((error) => {
            console.log(error);
        });

    //transform read data to orderevaluation
    return await orderEvaluationFilter.transformOrderEvaluations(sid, year, respEvaluationRecords, respAccounts);

}