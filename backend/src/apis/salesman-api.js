const SalesMan = require("../models/SalesMan")
const salesManService = require("../services/salesman-service");

exports.getSalesMan = async function(req, res) {
    const sid = parseInt(req.params.sid);
    const resp = await salesManService.salesManRead(sid)
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp.data);
}

exports.getAllSalesMan = async function(req, res) {
    const resp = await salesManService.salesManReadAll()
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp.data);
}

