const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");
const Permissions = require("../Globals").Permissions;

exports.getBonusCompCollection = async function (req, res) {
    const sid = req.params.sid;
    const user = req.session.user;
    if (!Permissions.hasUserPermission(user, "readBonus") && user.username !== sid) {
        return res.status(401).send("You are not authorized to read this bonus computation sheet")
    }
    const year = req.params.year;
    const db = req.app.get('db');
    const resp = await bonusCompCollectionController.getBonusComputationCollection(sid, year, user, db);
    if (resp === "error") {
        return res.status(404).send("incomplete social perforamnce");
    }
    return res.send(resp);
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
    if (!resp) { res.send({ status: 400, msg: "permission error" }) }
    if (resp.status) return res.status(resp.status).send(res.msg);
    return resp;
}