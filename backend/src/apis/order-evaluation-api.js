const orderEvaluationController = require("../controllers/order-evaluation-controller");

exports.getOrderEvaluations = async function(req, res) {
    const sid = req.params.sid;
    const year = req.params.year;

    const filteredOrderEvaluations = await orderEvaluationController.getOrderEvaluations(sid, year);

    return res.send(filteredOrderEvaluations);
}

