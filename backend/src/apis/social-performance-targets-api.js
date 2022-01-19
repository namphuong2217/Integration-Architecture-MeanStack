const socialPerformancTargetService = require("../services/social-performance-target-service");

exports.post = async (req, res) => {
    const db = req.app.get('db');
    const body = req.body;
    const user = req.session.user;
    const result = await socialPerformancTargetService.add(db, body, user);
    if (result.status === 200) return res.status(200).send();
    return res.status(result.status).send(result.msg);
}