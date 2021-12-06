const performanceRecordService = require("../../services/old/performanceRecord-service");
const PerformanceRecord = require("../../models/old/PerformanceRecord");

exports.addPerformanceRecord = async(req, res) => {
    const db = req.app.get('db');
    const performanceRecord = new PerformanceRecord(req.body.sid, req.body.goal_id, req.body.goal_description, req.body.target_value, req.body.actual_value, req.body.year);
    const prInCollection = performanceRecordService.prInCollection(db, performanceRecord);
    if(await prInCollection){
        return res.send(JSON.stringify({status: "error: performance record already in collection"}));
    }
    const id = await performanceRecordService.add(db, performanceRecord);
    return res.send(id ? JSON.stringify({status: "success"}) : JSON.stringify({status: "error"}));
}

exports.getPerformanceRecord = async(req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const performanceRecord = await performanceRecordService.get(db, sid);
    return res.send(JSON.stringify(performanceRecord));
}

exports.deletePerformanceRecord = async(req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const goalID = parseInt(req.params.goalID);
    const deleted = performanceRecordService.delete(db, sid, goalID);
    const status = await deleted ? {status: "deleted"} : {status: "performance record not found"}; 
    return res.send(JSON.stringify(status));
}

exports.updatePerformanceRecord = (req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const goalID = parseInt(req.params.goalID);
    const pr = req.body;
    performanceRecordService.update(db, sid, goalID, pr);
    return res.send(JSON.stringify({status: "updated"}));
}