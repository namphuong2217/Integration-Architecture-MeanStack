const orderEvaluationController = require("../controllers/order-evaluation-controller");

exports.getTotalSales = async function(req, res){
    const year = req.params.year;
    const resp = await orderEvaluationController.getNumberOfSales(year);
    res.status(resp.status).send(resp.numberOfSales.toString());
}

