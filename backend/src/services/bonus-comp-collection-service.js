const readBonusCompCollection = async (sid, year, db) => {
    const filter = { sid: sid, year: parseInt(year) };
    const res = await db.collection('bonusCompCollection').findOne(filter);
    if (res) return { status: 200, payload: res };
    return { status: 404, payload: "no targets for sid and year" };
}

exports.getApprovedBonuses = async (year, db) => {
    const bonusCompCollection = db.collection("bonusCompCollection");
    const filter = { year: year };
    const res = await bonusCompCollection.find(filter).toArray();
    const approvedBySid = await res.map(bonus => {
        return { sid: bonus.sid, approvedByCEO: bonus.approvedByCEO, approvedByHR: bonus.approvedByHR };
    });
    return await approvedBySid;
}

module.exports.readBonusCompCollection = readBonusCompCollection;

exports.writeBonusCompCollection = async (bonusComputationCollection, db) => {
    const respRead = await readBonusCompCollection(bonusComputationCollection.sid, bonusComputationCollection.year, db);
    if (respRead.status === 200) {
        return { status: 500, msg: "bonus computation collection already in collection" };
    }
    const res = await db.collection('bonusCompCollection').insertOne(bonusComputationCollection);
    if (res) return { status: 200, msg: "insertion successful" };
    return { status: 404, msg: "post error for sid and year" };
}

exports.updateBonusCompCollection = async (sid, year, updateVal, db) => {
    const respRead = await readBonusCompCollection(sid, year, db);
    if (respRead.status !== 200) {
        return { status: 500, msg: "bonus computation collection not yet in collection for update" };
    }
    const filter = { sid: sid, year: parseInt(year) };
    const res = db.collection('bonusCompCollection').updateOne(filter, { $set: updateVal })
    if (res) return { status: 200, msg: "update succesful" };
    return { status: 404, payload: "update error for sid and year" };
}

exports.updateBonusSocialPerformance = async (bonusComputationCollection, db) => {
    const bonusCollection = db.collection('bonusCompCollection');
    filter = { sid: bonusComputationCollection.sid, year: Number(bonusComputationCollection.year) };
    await bonusCollection.deleteOne(filter);
    const res = bonusCollection.insertOne(bonusComputationCollection);
    if (res) return { status: 200, payload: bonusComputationCollection };
    return { status: 500, payload: "Could not insert updated social performance" }
}

exports.deleteBonusComputationCollection = async function (sid, year, db) {
    const respRead = await readBonusCompCollection(sid, year, db);
    if (respRead.status !== 200) {
        return { status: 500, msg: "bonus computation collection not in collection for deletion" };
    }
    const filter = { sid: sid, year: parseInt(year) };
    const res = db.collection('bonusCompCollection').deleteOne(filter);
    if (res) return { status: 200, msg: "deletion successful" };
    return { status: 404, payload: "update error for sid and year" };
}

