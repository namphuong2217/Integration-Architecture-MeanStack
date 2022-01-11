const salesManService = require("../services/employee-service");
const Employee = require("../models/Employee");
const bonusFilter = require("./transformation/bonus-filter");
const Bonus = require("../models/Bonus")


exports.getEmployee = async function(sid) {
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return new Employee(resp.code, resp.firstName, resp.lastName, resp.unit);
}

exports.getSalesmen = async function() {
    const resp = await salesManService.employeesRead()
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}

    let listOfSalesmenFinal = [];
    for (const salesman of resp){
        if(salesman.unit == "Sales"){
            const salesmanFinal = new Employee(salesman.code, salesman.firstName, salesman.lastName, salesman.unit);
            listOfSalesmenFinal.push(salesmanFinal);
        }
    }
    return listOfSalesmenFinal;
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
exports.postEmployeeBonus = async function(sid, body, bonusOHRM) {
    if(!body.value || !body.year){
        return {status : "error"}
    }
    const bonus = new Bonus(body.year, bonusOHRM);
    const resp = await salesManService.writeEmployeeBonus(sid, bonus)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return resp;
}