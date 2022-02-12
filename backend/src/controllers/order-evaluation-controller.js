
const orderEvaluationService = require("../services/order-evaluation-service");
const orderEvaluationFilter = require("./transformation/order-evaluation-transformation");

exports.getOrderEvaluations = async function(sid, year){

    // get evaluation records from OpenCRX
    const respEvaluationRecords = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {console.log(error);});
    if(respEvaluationRecords.status !== 200){return respEvaluationRecords;}

    //get accounts from OpenCRX
    const respAccounts = await orderEvaluationService.accountsRead()
        .catch((error) => {console.log(error);});
    if(respAccounts.status !== 200){return respAccounts;}

    //transform read data to orderevaluation
    try{
        return await orderEvaluationFilter.transformOrderEvaluations(sid, year, respEvaluationRecords.payload, respAccounts.payload);
    }catch (e) {
        return e;
    }

}

exports.getNumberOfSales = async function(year) {
    const respEvaluationRecords = await orderEvaluationService.orderEvaluationsRead()
        .catch((error) => {console.log(error);});
    if(respEvaluationRecords.status !== 200){return respEvaluationRecords;}
    const sum = respEvaluationRecords.payload.objects
        .filter(order => order.activeOn && orderEvaluationFilter.getYearOfStringDate(order.activeOn) === String(year)).length;
    return {status: 200, numberOfSales: sum}
}
