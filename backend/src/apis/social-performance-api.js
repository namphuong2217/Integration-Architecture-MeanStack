const socialPerformanceService = require("../services/social-performance-service");

exports.addSocialPerformance = async (req, res) => {
    const db = req.app.get('db');
    const body = req.body;
    const user = req.session.user;
    const result = await socialPerformanceService.add(db, body, user);
    if (result.status === 200) return res.send();
    return res.status(result.status).send(result.msg);
}

exports.getSocialPerformance = async (req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const socialPerformance = await socialPerformanceService.get(db, sid);
    return res.send(JSON.stringify(socialPerformance));
}

exports.getYearAverage = async (req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const socialPerformance = await socialPerformanceService.getYearAverage(db, sid, year);
    return res.send(JSON.stringify(socialPerformance));
}

exports.deleteSocialPerformance = async (req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const result = socialPerformanceService.delete(db, sid, year);
    return res.send(await result);
}

exports.updateSocialPerformance = async (req, res) => {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const sp = req.body;
    const result = await socialPerformanceService.update(db, sid, year, sp);
    return res.send(result);
}