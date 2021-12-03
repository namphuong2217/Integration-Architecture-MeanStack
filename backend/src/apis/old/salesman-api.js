const salesManService = require("../../services/old/salesMan-service");
const SalesMan = require("../../models/SalesMan")


/**
 * endpoint, which saves salesman
 * @param req express request
 * @param res express response
 * @return express response with insertedId
 */
exports.addSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const salesMan = new SalesMan(req.body.sid, req.body.first_name, req.body.last_name);
    const answer = await salesManService.add(db, salesMan);
    return res.send(answer);
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
    return res.send(JSON.stringify(salesMan));
}

/**
 * endpoint, which deletes collection salesman
 * @param req express request
 * @param res express response
 * @return eString answer
 */

exports.getAllSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const answer = await salesManService.getAll(db);
    return res.send(answer);
}

/**
 * endpoint, which deletes salesman
 * @param req express request
 * @param res express response
 * @return  String answer
 */
exports.deleteSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const sid = parseInt(req.params.sid);
    const answer = await salesManService.delete(db, sid);
    return res.send(answer);
}

/**
 * endpoint, which deletes collection salesman
 * @param req express request
 * @param res express response
 * @return eString answer
 */

exports.deleteAllSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const answer = await salesManService.drop(db);
    return res.send(answer);
}

/**
 * endpoint, which updates salesman
 * @param req express request
 * @param res express response
 * @return eString answer
 */
exports.updateSalesMan = async function (req, res) {
    const db = req.app.get('db');//get database from express
    const sid = parseInt(req.params.sid);
    const answer = await salesManService.update(db, sid, req.body);
    return res.send(answer);
}





