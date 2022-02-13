const salesManService = require("../services/employee-service");
const Employee = require("../models/Employee");
const bonusFilter = require("./transformation/bonus-filter");
const Bonus = require("../models/Bonus")


exports.getEmployee = async function (sid) {
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    if (resp.status !== 200) { return resp }
    return new Employee(resp.payload.code, resp.payload.firstName, resp.payload.lastName, resp.payload.unit);
}

exports.getSalesmen = async function () {
    const resp = await salesManService.employeesRead()
        .catch((error) => {
            console.log(error);
        });
    if (resp.status !== 200) { return resp }
    let listOfSalesmenFinal = [];
    for (const salesman of resp.payload) {
        if (salesman.unit === "Sales") {
            const salesmanFinal = new Employee(salesman.code, salesman.firstName, salesman.lastName, salesman.unit);
            listOfSalesmenFinal.push(salesmanFinal);
        }
    }
    return listOfSalesmenFinal;
}

exports.getEmployeeBonus = async function (sid, year) {
    const resp = await salesManService.readEmployeeBonus(sid, year)
        .catch((error) => {
            console.log(error);
        });
    if (resp.status !== 200) { return resp }
    return bonusFilter.filterOrderEvaluationByYear(resp.payload, year);
}
//bonus is updated if the value already exists
exports.postEmployeeBonus = async function (sid, year, bonus) {
    console.log("HERE");
    if (!sid || !year || !bonus) {
        return { status: 409, msg: "input error" };
    }
    const bonusObj = new Bonus(year, bonus);
    return await salesManService.writeEmployeeBonus(sid, bonusObj);
}