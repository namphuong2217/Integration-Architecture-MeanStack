


exports.readBonusCompCollection = async (sid, year, db) => {
    const filter = { sid: sid, year: year };
    let res = await db.collection('bonusCompCollection').findOne(filter);
    return res;
}

exports.writeBonusCompCollection = async(bonusComputationCollection, db) => {
    await db.collection('bonusCompCollection').insertOne(bonusComputationCollection);
}