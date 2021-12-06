const SalesMan = require("../models/SalesMan")
const salesManService = require("../services/salesman-service");

exports.getEmployee = async function(req, res) {
    const resp = await salesManService.employeeRead(req.params.sid)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return res.send(resp)};
    const salesMan = new SalesMan(resp["code"], resp["firstName"], resp["lastName"], "Sales");
    return res.send(salesMan);
}

exports.getEmployeeObject = async function(sid) {
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    const salesMan = new SalesMan(resp["code"], resp["firstName"], resp["lastName"], "Sales");
    return salesMan;
}


exports.postEmployeeBonus = async function(req, res) {
    const resp = await salesManService.salesManBonusWrite(req.params.sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.getEmployeeBonus = async function(req, res) {
    const resp = await salesManService.salesManBonusRead(req.params.sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

