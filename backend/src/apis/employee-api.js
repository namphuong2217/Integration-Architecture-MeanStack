const employeeController = require("../controllers/employee-controller")

exports.getEmployee = async function(req, res) {
    const sid = req.params.sid;
    const salesMan = await employeeController.getEmployee(sid);
    return res.send(salesMan);
}

exports.getEmployees = async function(req, res) {
    const salesMan = await employeeController.getSalesmen();
    return res.send(salesMan);
}

exports.getEmployeeBonus = async function(req, res) {
    const sid = req.params.sid;
    const year = req.params.year;
    const resp = await employeeController.getEmployeeBonus(sid, year)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.postEmployeeBonus = async function(req, res) {
    const sid = req.params.sid;
    const resp = await employeeController.postEmployeeBonus(sid, req.body)
        .catch((error) => {res.send(error)});
    return res.send(resp);
}

