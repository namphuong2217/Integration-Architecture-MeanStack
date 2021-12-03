const SalesMan = require("../models/SalesMan")
const salesManService = require("../services/salesman-service");

exports.getSalesMan = async function(req, res) {
    const resp = await salesManService.salesManRead()
        .catch((error) => {
            console.log(error);
        });
    return res.send(resp.data);
}