const OrderEvaluation = require("./OrderEvaluation")
const bonusCalcEnricher = require("../controllers/transformation/bonus-calculation-enricher")

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
                orderEval.items, bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking,orderEval.items), ""));
        });
        return listOrderEval;
    }
}

module.exports = OrderEvaluationEval;