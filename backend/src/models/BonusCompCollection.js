
class BonusCompCollection {
    constructor(year, salesman, orderEvaluation, socialPerformance, approvedByCEO = false,
        approvedByHR = false, bonusOrder = 0, bonusSocial = 0, targets=[], comments =[]) {
        this.year = year;
        this.salesman = salesman;
        this.orderEvaluation = orderEvaluation;
        this.socialPerformance = socialPerformance;
        this.approvedByCEO = approvedByCEO;
        this.approvedByHR = approvedByHR;
        this.bonusSocial = bonusSocial;
        this.bonusOrder = bonusOrder;
        this.bonusTotal = bonusOrder + bonusSocial;
        this.targets = targets;
        this.comments = comments;
    }
}

module.exports = BonusCompCollection;