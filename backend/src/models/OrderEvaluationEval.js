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
        let bonusSum = 0;
        orderEvaluation.forEach(orderEval => {
            const bonus = bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking,orderEval.items);
            bonusSum += bonus;
            listOrderEval.push(new OrderEvaluationEval(orderEval.nameProduct, orderEval.client, orderEval.clientRanking,
                orderEval.items, bonus, ""));
        });
        return {listOrderEval: listOrderEval, bonusSum : bonusSum};
    }
}

module.exports = OrderEvaluationEval;