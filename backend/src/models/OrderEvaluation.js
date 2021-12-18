class OrderEvaluation{
    constructor(nameProduct, client, clientRanking, items, bonus) {
        this.nameProduct = nameProduct;
        this.client = client;
        this.clientRanking = clientRanking;
        this.items = items;
        this.bonus = bonus;
    }
}

module.exports = OrderEvaluation;