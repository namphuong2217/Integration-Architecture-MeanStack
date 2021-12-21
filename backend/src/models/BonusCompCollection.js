
class BonusCompCollection {
    constructor(salesman, orderEvaluation, socialPerformance, approvedByCEO=false, approvedByHR = false) {
        this.salesman = salesman;
        this.orderEvaluation = orderEvaluation;
        this.socialPerformance = socialPerformance;
        this.approvedByCEO = approvedByCEO;
        this.approvedByHR = approvedByHR;
    }
}

module.exports = BonusCompCollection;