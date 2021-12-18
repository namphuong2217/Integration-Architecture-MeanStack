const salesManController = require("../controllers/salesman-controller")

exports.getEmployee = async function(req, res) {
    const sid = req.params.sid;
    const salesMan = await salesManController.getEmployee(sid);
    return res.send(salesMan);
}

exports.getEmployeeBonus = async function(req, res) {
    const sid = req.params.sid;
    const year = req.params.year;
    const resp = await salesManController.getEmployeeBonus(sid, year)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

exports.postEmployeeBonus = async function(req, res) {
    const sid = req.params.sid;
    const resp = await salesManController.postEmployeeBonus(sid, req.body)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp);
}

