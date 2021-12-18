const salesManService = require("../services/salesman-service");
const SalesMan = require("../models/SalesMan");
const bonusFilter = require("./transformation/bonus-filter");
const Bonus = require("../models/Bonus")


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
//bonus is updated if the value already exists
exports.postEmployeeBonus = async function(sid, body) {
    if(!body.value || !body.year){
        return {status : "error"}
    }
    const bonus = new Bonus(body.year, body.value);
    const resp = await salesManService.writeEmployeeBonus(sid, bonus)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return resp;
}