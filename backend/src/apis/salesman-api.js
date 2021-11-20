const salesManService = require("../services/salesMan-service");
const SalesMan = require("../models/SalesMan")
exports.firstTest = async function(req, res){
    console.log("HELLO WORLD")
    res.send("Hello World");
}

/**
 * endpoint, which saves salesman
 * @param req express request
 * @param res express response
 * @return express response with insertedId
 */
exports.addSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const salesMan = new SalesMan(req.body.sid, req.body.first_name, req.body.last_name);
    const insertedId = await salesManService.add(db, salesMan);
    return res.send(`{insertedId : ${insertedId}}`);
}

/**
 * endpoint, which gets salesman
 * @param req express request
 * @param res express response
 * @return express response with salesMan object
 */
exports.getSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const sid = parseInt(req.params.sid);
    const salesMan = await salesManService.get(db, sid);
    console.log("HERE");
    return res.send(JSON.stringify(salesMan));
}

