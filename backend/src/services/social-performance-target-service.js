const SocialPerformanceTargets = require("../models/SocialPerformanceTargets");

exports.add = async (db, body, user) => {
    const year = new Date().getFullYear();
    if (body.sid === user.username) return { status: 401, msg: "you cant rate yourself" };
    if (user.role !== "Leader") return { status: 401, msg: "only the ceo is allowed to perform this action" };
    const socialPerformanceTargets = new SocialPerformanceTargets(body.sid, year, body.leadershipCompetence, body.openness, body.socialBehaviour, body.attitude, body.communicationSkills, body.integrity);
    const spTargetIsInCollection = spInCollection(db, socialPerformanceTargets);
    if (await spTargetIsInCollection) {
        return { status: 500, msg: "targets are already in collection" };
    }
    for (const [key, value] of Object.entries(body)) {
        if (!value) return { status: 500, msg: `${key}: Value is missing!` };
    }
    if ((await db.collection('socialPerformanceTargetCollection').insertOne(socialPerformance)).insertedId) {
        return { status: 200, msg: "success" };
    }
}

const spInCollection = async (db, socialPerformanceTargets) => {
    let spTargetCollection = db.collection('socialPerformanceTargetCollection');
    const filter = { sid: socialPerformanceTargets.sid, year: socialPerformanceTargets.year };
    const res = spTargetCollection.findOne(filter);
    if (await res) return true;
    return false;
}

const get = async (db, sid, year, user) => {
    if (user.role !== "Leader") return { status: 401, payload: "only the ceo is allowed to perform this action" };
    let spTargetCollection = db.collection('socialPerformanceTargetCollection');
    const filter = { sid: sid, year: year };
    const res = await spTargetCollection.findOne(filter);
    if (await res) return { status: 200, payload: await res };
    return { status: 404, payload: "no targets for sid" };
}