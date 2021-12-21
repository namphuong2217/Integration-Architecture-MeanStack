
class BonusCompCollection {
    constructor(sid, year, salesman, orderEvaluation, socialPerformance, approvedByCEO=false, approvedByHR = false) {
        this.sid = sid;
        this.year = year;
        this.salesman = salesman;
        this.orderEvaluation = orderEvaluation;
        this.socialPerformance = socialPerformance;
        this.approvedByCEO = approvedByCEO;
        this.approvedByHR = approvedByHR;
    }
}

module.exports = BonusCompCollection;