const salesManService = require("../services/salesman-service");
const SalesMan = require("../models/SalesMan");
const bonusFilter = require("./filter/bonus-filter");


exports.getEmployee = async function(sid) {
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return new SalesMan(resp["code"], resp["firstName"], resp["lastName"], "Sales");
}

exports.getEmployeeBonus = async function(sid, year) {
    const resp = await salesManService.readEmployeeBonus(sid, year)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return bonusFilter.filterOrderEvaluationBySid(resp, year);
}