const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");
const Permissions = require("../Globals").Permissions;

exports.getBonusCompCollection = async function(req, res) {
    const sid = req.params.sid;
    const year = req.params.year;
    const db = req.app.get('db');
    const resp = await bonusCompCollectionController.getBonusComputationCollection(sid, year, db);
    return res.send(resp);
}


exports.postBonusCompCollection = async function(req, res){
    const body = req.body;
    const db = req.app.get('db');
    const user = {role : "HR"};// TODO session.user
    let resp ;
    if(Permissions.hasUserPermission(user, "approveBonusHR")){
        resp = await bonusCompCollectionController.approvedByHR(body.sid, body.year, db);
    } else if(Permissions.hasUserPermission(user, "approveBonusCEO")){
        resp = await bonusCompCollectionController.approvedByCEO(body.sid, body.year, body.comments, db);
    }
    if(!resp){res.send({status: 400, msg: "permission error"})}
    return res.send(resp);
}