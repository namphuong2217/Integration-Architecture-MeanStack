const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");

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
    const resp = await bonusCompCollectionController.postBonusComputationCollection(body, db);
    return res.send(resp);
}