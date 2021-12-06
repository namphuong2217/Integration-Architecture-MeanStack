class OrderEvaluation{
    constructor(nameProduct, client, clientRanking, items) {
        this.nameProduct = nameProduct;
        this.client = client;
        this.clientRanking = clientRanking;
        this.items = items;
    }
}

module.exports = OrderEvaluation;