const {response} = require("express");


const readBonusCompCollection = async (sid, year, db) => {
    const filter = { sid: sid, year: parseInt(year) };
    const res = await db.collection('bonusCompCollection').findOne(filter);
    if (res) return { status: 200, payload: res };
    return { status: 404, payload: "no targets for sid and year" };
}

module.exports.readBonusCompCollection = readBonusCompCollection;

exports.writeBonusCompCollection = async(bonusComputationCollection, db) => {
    const respRead = await readBonusCompCollection(bonusComputationCollection.sid, bonusComputationCollection.year, db);
    if(respRead.status === 200){
        return {status: 500, msg: "bonus computation collection already in collection"};
    }
    const res = await db.collection('bonusCompCollection').insertOne(bonusComputationCollection);
    if (res) return { status: 200, msg: "insertion successful" };
    return { status: 404, payload: "post error for sid and year" };
}

exports.updateBonusCompCollection = async(sid, year, updateVal, db) => {
    const respRead = await readBonusCompCollection(sid, year, db);
    if(respRead.status !== 200){
        return {status: 500, msg: "bonus computation collection not yet in collection for update"};
    }
    const filter = { sid: sid, year: parseInt(year) };
    const res = db.collection('bonusCompCollection').updateOne(filter, {$set : updateVal})
    if (res) return { status: 200, msg : "update succesful" };
    return { status: 404, payload: "update error for sid and year" };
}

exports.deleteBonusComputationCollection = async function(sid, year, db) {
    const respRead = await readBonusCompCollection(sid, year, db);
    if(respRead.status !== 200){
        return {status: 500, msg: "bonus computation collection not in collection for deletion"};
    }
    const filter = { sid: sid, year: parseInt(year) };
    const res = db.collection('bonusCompCollection').deleteOne(filter);
    if (res) return { status: 200, msg : "deletion successful" };
    return { status: 404, payload: "update error for sid and year" };
}

