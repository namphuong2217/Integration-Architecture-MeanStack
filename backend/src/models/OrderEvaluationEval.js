const OrderEvaluation = require("./OrderEvaluation")

class OrderEvaluationEval extends OrderEvaluation{
    constructor(nameProduct, client, clientRanking, items, bonus, comment){
        super(nameProduct, client, clientRanking, items);
        this.bonus = bonus;
        this.comment = comment;
    }

    static fromOrderEvaluation(orderEvaluation) {
        let listOrderEval = [];
        orderEvaluation.forEach(orderEval => {
            listOrderEval.push(new OrderEvaluationEval(orderEval.nameProduct, orderEval.client, orderEval.clientRanking,
                orderEval.items, 200, ""));
        });
        return listOrderEval;
    }
}

module.exports = OrderEvaluationEval;