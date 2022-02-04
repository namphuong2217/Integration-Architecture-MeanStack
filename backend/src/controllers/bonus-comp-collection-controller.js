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
    const socialPerformance = await socialPerformanceService.getYearAverage(db, sid, year);
    if (socialPerformance.status === "error") return "error";
    const salesman = await salesmanController.getEmployee(sid);

    const bonusOrder = [];
    orderEvaluation.forEach(orderEval => {
        bonusOrder.push(bonusCalcEnricher.getBonusForSale(orderEval.nameProduct, orderEval.clientRanking, orderEval.items));
        orderEval.clientRanking = translateRatingToString(orderEval.clientRanking);
    });

    const targetResp = await socialPerformanceTargetService.get(db, sid, year);
    if (targetResp.status !== 200) return "error";
    const bonusSocial = [];
    Object.keys(socialPerformance).filter(key => key !== "sid" && key !== "year").forEach(socialKey => {
        bonusSocial.push(bonusCalcEnricher.getBonusForSocialPerformance(socialKey, targetResp.payload[socialKey], socialPerformance[socialKey]));
    });
    return new BonusCompCollection(sid, year, salesman, orderEvaluation,
        socialPerformance, false, false, bonusOrder, bonusSocial, targetResp.payload);
}

module.exports.getBonusComputationCollection = getBonusComputationCollection;

exports.approvedByCEO = async function (sid, year, comments, db) {
    const bonusCompCollectionResp = await bonusCompCollectionService.readBonusCompCollection(sid, year, db);
    //if not yet in database
    if (bonusCompCollectionResp.status !== 200) {
        let bonusCompCollection = await getBonusComputationCollection(sid, year, db);
        bonusCompCollection.approvedByCEO = true;
        bonusCompCollection.comments = comments;
        if (!hasCommentArraySameLength(bonusCompCollection.orderEvaluation, bonusCompCollection.socialPerformance, comments)) {
            return { status: 400, msg: "wrong input comment" }
        }
        return await bonusCompCollectionService.writeBonusCompCollection(bonusCompCollection, db);
    }
    if (!hasCommentArraySameLength(bonusCompCollectionResp.payload.orderEvaluation, bonusCompCollectionResp.payload.socialPerformance, comments)) {
        return { status: 400, msg: "wrong input comment" }
    }
    //if already approved
    if (bonusCompCollectionResp.payload.approvedByCEO) {
        return JSON.stringify({ status: "404", msg: `collection is already approved` });
    }
    //if both approved - send to orangehrm
    if (bonusCompCollectionResp.payload.approvedByHR) {
        await salesmanController.postEmployeeBonus(sid, year, bonusCompCollectionResp.payload.bonusTotal);
    }
    //update bonusCompCollection
    return await bonusCompCollectionService.updateBonusCompCollection(
        sid, year, { "approvedByCEO": true, comments: comments }, db);
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
        return JSON.stringify({ status: "404", msg: `collection is already approved` });
    }
    //if both approved - send to orangehrm
    if (bonusCompCollectionResp.payload.approvedByCEO) {
        await salesmanController.postEmployeeBonus(sid, year, bonusCompCollectionResp.bonusTotal); // post bonus on OHRM
    }
    //update bonusCompCollection
    return await bonusCompCollectionService.updateBonusCompCollection(sid, year, { "approvedByHR": true }, db);
}

//HELPER FUNCTION
function hasCommentArraySameLength(salesOrder, socialperformance, comments) {
    return comments.length === salesOrder.length + (socialperformance.integrity ? 6 : 0);
}