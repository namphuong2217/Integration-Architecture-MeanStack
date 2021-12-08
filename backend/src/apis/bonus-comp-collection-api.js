const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");

exports.getPerformanceRecord = async function(req, res) {
    const sid = req.params.sid;
    const resp = await bonusCompCollectionController.getPerformanceRecord(req, sid);
    return res.send(resp);
}