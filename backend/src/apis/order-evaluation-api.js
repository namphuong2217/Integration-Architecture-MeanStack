const orderEvaluationController = require("../controllers/order-evaluation-controller");

exports.getOrderEvaluations = async function(req, res) {
    const sid = req.params.sid;

    const filteredOrderEvaluations = await orderEvaluationController.getOrderEvaluations(sid);

    return res.send(filteredOrderEvaluations);
}

