const socialPerformanceService = require("../services/social-performance-service");
const SocialPerformance = require("../models/SocialPerformance");


exports.addSocialPerformance = async (req, res) => {
    const user = req.session.user;
    const year = new Date().getFullYear();
    console.log(req.body);
    const db = req.app.get('db');
    const body = req.body;
    if (body.sid === user.sid) {
        res.status(401).send("you cant rate yourself");
        return;
    }
    const socialPerformance = new SocialPerformance(body.sid, user.username, year, body.leadership_competence, body.openness, body.social_behaviour, body.attitude, body.comm_skills, body.integrity);
    const spInCollection = socialPerformanceService.spInCollection(db, socialPerformance);
    if (await spInCollection) {
        res.status(500).send("social performance already in collection");
        return;
    }
    const id = await socialPerformanceService.add(db, socialPerformance);
    return res.send(id ? JSON.stringify({ status: "success" }) : JSON.stringify({ status: "error" }));
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