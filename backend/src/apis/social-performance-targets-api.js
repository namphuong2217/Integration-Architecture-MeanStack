const socialPerformancTargetService = require("../services/social-performance-target-service");

exports.add = async (req, res) => {
    const db = req.app.get('db');
    const body = req.body;
    const user = req.session.user;
    const result = await socialPerformancTargetService.add(db, body);
    if (result.status === 200) return res.send();
    return res.status(result.status).send(result.msg);
}

exports.get = async (req, res) => {
    const db = req.app.get('db');
    const sid = req.params.sid;
    const year = req.params.year;
    const user = req.session.user;
    const result = await socialPerformancTargetService.get(db, sid, year, user);
    if (result.status === 200) return res.send(result.payload);
    return res.status(result.status).send(result.payload);
}