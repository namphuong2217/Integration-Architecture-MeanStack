const SalesMan = require("../models/SalesMan")
const salesManService = require("../services/salesman-service");

exports.getEmployee = async function(req, res) {
    const sid = parseInt(req.params.sid);
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.getEmployees = async function(req, res) {
    const resp = await salesManService.employeesRead()
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.postEmployeeBonus = async function(req, res) {
    const sid = parseInt(req.params.sid);
    const resp = await salesManService.salesManBonusWrite(sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.getEmployeeBonus = async function(req, res) {
    const sid = parseInt(req.params.sid);
    const resp = await salesManService.salesManBonusRead(sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

