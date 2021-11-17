const salesManService = require("../services/salesMan-service");
const SalesMan = require("../models/SalesMan")
exports.firstTest = async function(req, res){
    console.log("HELLO WORLD")
    res.send("Hello World");
}

/**
 * endpoint, which handles salesman request
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.addSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const salesMan = new SalesMan(req.body.sid, req.body.first_name, req.body.last_name);
    const sid = await salesManService.add(db, salesMan);
    return res.send(`{sid : ${sid}}`);
}

exports.getSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const sid = req.body.sid;
    const salesMan = await salesManService.get(db, sid);
    console.log("HERE");
    return res.send(JSON.stringify(salesMan));
}