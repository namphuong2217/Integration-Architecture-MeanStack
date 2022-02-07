const socialPerformanceTargetService = require("../services/social-performance-target-service");

exports.add = async (req, res) => {
    const db = req.app.get('db');
    const body = req.body;
    const user = req.session.user;
    const result = await socialPerformanceTargetService.add(db, body);
    if (result.status === 200) return res.send();
    return res.status(result.status).send(result.msg);
}

exports.get = async (req, res) => {
    const db = req.app.get('db');
    const sid = req.params.sid;
    const year = req.params.year;
    const result = await socialPerformanceTargetService.get(db, sid, year);
    if (result.status === 200) return res.send(result.payload);
    return res.status(result.status).send(result.payload);
}

exports.doesExist = async (req, res) => {
    const db = req.app.get('db');
    const sid = req.params.sid;
    const year = req.params.year;
    const result = await socialPerformanceTargetService.targetsExist(db, sid, year);
    return res.send(JSON.stringify({ exists: result }));
}