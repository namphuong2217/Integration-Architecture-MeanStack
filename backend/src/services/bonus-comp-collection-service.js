


const readBonusCompCollection = async (sid, year, db) => {
    const filter = { sid: parseInt(sid), year: parseInt(year) };
    return await db.collection('bonusCompCollection').findOne(filter);
}

module.exports.readBonusCompCollection = readBonusCompCollection;

exports.writeBonusCompCollection = async(bonusComputationCollection, db) => {
    if(await readBonusCompCollection(bonusComputationCollection.sid, bonusComputationCollection.year, db)){
        return JSON.stringify({status: "error", message: "social performance already in db"});
    }
    return (await db.collection('bonusCompCollection').insertOne(bonusComputationCollection)).insertedId;
}

exports.updateBonusCompCollection = async(sid, year, updateVal, db) => {
    if(!(await readBonusCompCollection(sid, year, db))){
        return JSON.stringify({status: "error", message: "social performance not in db"});
    }
    const filter = { sid: parseInt(sid), year: parseInt(year) };
    db.collection('bonusCompCollection').updateOne(filter, {$set : updateVal})
}

exports.deleteBonusComputationCollection = async function(sid, year, db) {
    if(!(await readBonusCompCollection(sid, year, db))){
        return JSON.stringify({status: "error", message: "social performance not in db"});
    }
    const filter = { sid: parseInt(sid), year: parseInt(year) };
    db.collection('bonusCompCollection').deleteOne(filter);
}

