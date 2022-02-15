const orderEvaluationController = require("../controllers/order-evaluation-controller");
const salesmanController = require("./employee-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

const BonusCompCollection = require("../models/BonusCompCollection");

const socialPerformanceTargetService = require("../services/social-performance-target-service");

const socialPerformanceService = require("../services/social-performance-service");
const bonusCalcEnricher = require("./transformation/bonus-calculation-enricher");
const { translateRatingToString } = require("./transformation/order-evaluation-ranking-translator");

const getBonusComputationCollection = async function (sid, year, db) {
    year = parseInt(year);
    // If the collection is already in database
    const bonusCompCollectionResp = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    if (bonusCompCollectionResp.status === 200) {
        return bonusCompCollectionResp.payload;
    }

    // Collect data from different controllers
    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid, year);
    if (orderEvaluation.length === 0) return { status: 500, payload: "No Order Evaluations" };
    const socialPerformance = await socialPerformanceService.getYearAverage(db, sid, year);
    if (socialPerformance.status === "error") return { status: 500, payload: "Incomplete Social Performance Rating" };
    const salesman = await salesmanController.getEmployee(sid);

    const bonusOrder = [];
    orderEvaluation.forEach(orderEval => {
        bonusOrder.push(bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking, orderEval.items));
        orderEval.clientRanking = translateRatingToString(orderEval.clientRanking);
    });

    const targetResp = await socialPerformanceTargetService.get(db, sid, year);
    if (targetResp.status !== 200) return { status: 500, payload: "No Social Performance Targets yet" };
    const bonusSocial = [];
    Object.keys(socialPerformance).filter(key => key !== "sid" && key !== "year").forEach(socialKey => {
        bonusSocial.push(bonusCalcEnricher.getBonusForSocialPerformance(socialKey, targetResp.payload[socialKey], socialPerformance[socialKey]));
    });
    return new BonusCompCollection(sid, year, salesman, orderEvaluation,
        socialPerformance, false, false, bonusOrder, bonusSocial, targetResp.payload);
}

module.exports.getBonusComputationCollection = getBonusComputationCollection;

const updateBonusComputationCollection = async function (sid, year, newSocialPerformance, newTargets, db) {
    year = parseInt(year);

    // Collect data from different controllers
    const orderEvaluation = await orderEvaluationController.getOrderEvaluations(sid, year);
    if (orderEvaluation.length === 0) return { status: 500, payload: "No Order Evaluations" };
    const salesman = await salesmanController.getEmployee(sid);

    const bonusOrder = [];
    orderEvaluation.forEach(orderEval => {
        bonusOrder.push(bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking, orderEval.items));
        orderEval.clientRanking = translateRatingToString(orderEval.clientRanking);
    });

    const bonusSocial = [];
    Object.keys(newSocialPerformance).filter(key => key !== "sid" && key !== "year").forEach(socialKey => {
        bonusSocial.push(bonusCalcEnricher.getBonusForSocialPerformance(socialKey, newTargets[socialKey], newSocialPerformance[socialKey]));
    });
    const bonus = new BonusCompCollection(sid, year, salesman, orderEvaluation,
        newSocialPerformance, false, true, bonusOrder, bonusSocial, newTargets);

    const oldBonusResp = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    if (oldBonusResp.status === 200) {
        const oldBonus = oldBonusResp.payload;
        bonus.socialPerformanceComments = oldBonus.socialPerformanceComments;
        bonus.orderEvaluationComments = oldBonus.orderEvaluationComments;
        bonus.remarks = oldBonus.remarks;
    }

    return await bonusCompCollectionService.updateBonusSocialPerformance(bonus, db);
}

module.exports.updateBonusCompCollection = updateBonusComputationCollection;

exports.approvedByCEO = async function (sid, year, socialPerformanceComments, orderEvaluationComments, remarks, db) {
    const bonusCompCollectionResp = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    //if not yet in database
    if (bonusCompCollectionResp.status !== 200) {
        let bonusCompCollection = await getBonusComputationCollection(sid, year, db);
        bonusCompCollection.approvedByCEO = true;
        bonusCompCollection.socialPerformanceComments = socialPerformanceComments;
        bonusCompCollection.orderEvaluationComments = orderEvaluationComments;
        bonusCompCollection.remarks = remarks;
        return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
    }
    //if already approved
    if (bonusCompCollectionResp.payload.approvedByCEO) {
        return { status: 500, msg: `Collection is already approved` };
    }
    //if both approved - send to orangehrm
    if (bonusCompCollectionResp.payload.approvedByHR) {
        await salesmanController.postEmployeeBonus(sid, year, bonusCompCollectionResp.payload.bonusTotal);
    }
    //update bonusCompCollection
    return await bonusCompCollectionService.updateBonusCompCollection(
        sid, year, { "approvedByCEO": true, socialPerformanceComments: socialPerformanceComments, orderEvaluationComments: orderEvaluationComments, remarks: remarks }, db);
}

exports.approvedByHR = async function (sid, year, db) {
    const bonusCompCollectionResp = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    //if not yet in database
    if (bonusCompCollectionResp.status !== 200) {
        let bonusCompCollection = await getBonusComputationCollection(sid, year, db);
        bonusCompCollection.approvedByHR = true;
        return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
    }

    //if already approved
    if (bonusCompCollectionResp.payload.approvedByHR) {
        return { status: 500, msg: `Collection is already approved` };
    }
    //if both approved - send to orangehrm
    if (bonusCompCollectionResp.payload.approvedByCEO) {
        await salesmanController.postEmployeeBonus(sid, year, bonusCompCollectionResp.payload.bonusTotal); // post bonus on OHRM
    }
    //update bonusCompCollection
    return await bonusCompCollectionService.updateBonusCompCollection(sid, year, { "approvedByHR": true }, db);
}