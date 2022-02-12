const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");
const bonusCompCollectionService = require('../services/bonus-comp-collection-service');
const Permissions = require("../Globals").Permissions;

exports.getBonusCompCollection = async function (req, res) {
    const sid = req.params.sid;
    const user = req.session.user;
    if (user.username === sid) {
        return res.status(401).send("You are not authorized to read this bonus computation sheet")
    }
    const year = req.params.year;
    const db = req.app.get('db');
    const resp = await bonusCompCollectionController.getBonusComputationCollection(sid, year, db);
    if (resp.status) {
        return res.status(resp.status).send(resp.payload);
    }
    return res.send(resp);
}

exports.getApprovedBonuses = async (req, res) => {
    const db = req.app.get('db');
    const year = Number(req.params.year);
    const resp = await bonusCompCollectionService.getApprovedBonuses(year, db);
    res.send(JSON.stringify(resp));
}

exports.postBonusCompCollection = async function (req, res) {
    const body = req.body;
    const db = req.app.get('db');
    const user = req.session.user; //{role : "HR"};//
    let resp;
    if (Permissions.hasUserPermission(user, "approveBonusHR")) {
        resp = await bonusCompCollectionController.approvedByHR(body.sid, body.year, db);
    } else if (Permissions.hasUserPermission(user, "approveBonusCEO")) {
        resp = await bonusCompCollectionController.approvedByCEO(body.sid, body.year, body.socialPerformanceComments, body.orderEvaluationComments, db);
    }
    if (!resp) return res.status(401).send("permission error");
    if (resp.status) {
        if (resp.status === 200) return res.send();
        return res.status(resp.status).send(resp.msg);
    }
    return resp;
}