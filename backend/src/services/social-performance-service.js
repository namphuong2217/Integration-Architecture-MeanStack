const SocialPerformance = require("../models/SocialPerformance");

exports.get = (db, sid) => {
    let res = db.collection('socialPerformanceCollection').find({ sid: sid }).toArray();
    return res;
}

const spInCollection = async (db, socialPerformance) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: socialPerformance.sid, year: socialPerformance.year, issuerID: socialPerformance.issuerID };
    const res = spCollection.findOne(filter);
    if (await res) return true;
    return false;
}

exports.getYearAverage = async (db, sid, year) => {
    sid = sid.toString();
    let res = await db.collection('socialPerformanceCollection').find({ sid: sid, year: year }).toArray();
    if (await res.length === 0) return { status: "error", message: "user does not exist" };
    let avg = {};
    avg.sid = sid;
    avg.year = year;

    const recordCount = await res.length;

    res.forEach(record => {
        for (const [key, value] of Object.entries(record)) {
            if (key === "_id" || key === "sid" || key === "year" || key === "issuerID") continue;
            if (!avg[key]) avg[key] = 0;
            avg[key] += value.toString() / recordCount;
        }
    });

    for (const [key, value] of Object.entries(avg)) {
        if (key === "_id" || key === "sid" || key === "year" || key === "issuerID") continue;
        avg[key] = value.toFixed(2);
    }

    return avg;
}

exports.add = async (db, body, user) => {
    const issuerID = user.username;
    const year = new Date().getFullYear();
    if (body.sid === user.username) return { status: 401, msg: "you cant rate yourself" };
    if (user.role !== "Sales") return { status: 401, msg: "only salesmen are allowed to perform this action" };
    const socialPerformance = new SocialPerformance(body.sid, issuerID, year, body.leadershipCompetence, body.openness, body.socialBehaviour, body.attitude, body.communicationSkills, body.integrity);
    const spIsInCollection = spInCollection(db, socialPerformance);
    if (await spIsInCollection) {
        return { status: 500, msg: "social performance already in collection" };
    }
    for (const [key, value] of Object.entries(body)) {
        if (!value) return { status: 500, msg: `${key}: Value is missing!` };
    }
    if ((await db.collection('socialPerformanceCollection').insertOne(socialPerformance)).insertedId) {
        return { status: 200, msg: "success" };
    }
}

exports.delete = async (db, sid, year) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: sid, year: year };
    const spExists = await spCollection.findOne(filter);
    if (! await spExists) return JSON.stringify({ status: "error", message: "social performance not in db" });
    spCollection.deleteOne(filter);
    return JSON.stringify({ status: "deleted" });
}

exports.update = async (db, sid, year, socialPerformance) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: sid, year: year };
    const spExists = await spCollection.findOne(filter);
    if (! await spExists) return JSON.stringify({ status: "error", message: "social performance not in db" });
    const updateDocument = { $set: socialPerformance };
    await spCollection.updateOne(filter, updateDocument);
    return JSON.stringify({ status: "updated" });
}
