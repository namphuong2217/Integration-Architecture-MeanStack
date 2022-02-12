
class BonusCompCollection {
    constructor(sid, year, salesman, orderEvaluation, socialPerformance, approvedByCEO = false,
        approvedByHR = false, bonusOrder = 0, bonusSocial = 0, targets = [], socialPerformanceComments = [], orderEvaluationComments = [], remarks = "") {
        this.sid = sid;
        this.year = year;
        this.salesman = salesman;
        this.orderEvaluation = orderEvaluation;
        this.socialPerformance = socialPerformance;
        this.approvedByCEO = approvedByCEO;
        this.approvedByHR = approvedByHR;
        this.bonusSocial = bonusSocial;
        this.bonusOrder = bonusOrder;
        this.bonusSocialTotal = bonusSocial.reduce((x, y) => x + y, 0);
        this.bonusOrderTotal = bonusOrder.reduce((x, y) => x + y, 0);
        this.bonusTotal = this.bonusOrderTotal + this.bonusSocialTotal;
        this.targets = targets;
        this.socialPerformanceComments = socialPerformanceComments;
        this.orderEvaluationComments = orderEvaluationComments;
        this.remarks = remarks;
    }
}
module.exports = BonusCompCollection;