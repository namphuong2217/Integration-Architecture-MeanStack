


exports.readBonusCompCollection = async (sid, year, db) => {
    const filter = { sid: parseInt(sid), year: parseInt(year) };
    let res = await db.collection('bonusCompCollection').findOne(filter);
    return res;
}

exports.writeBonusCompCollection = async(bonusComputationCollection, db) => {
    return (await db.collection('bonusCompCollection').insertOne(bonusComputationCollection)).insertedId;
}