exports.get = (db, sid) => {
    let res = db.collection('performanceRecordCollection').find({sid: sid}).toArray();
    return res;
}

exports.add = async (db, performanceRecord) => {
    return (await db.collection('performanceRecordCollection').insertOne(performanceRecord)).insertedId; //return unique ID
}

exports.delete = async(db, sid, goal_id) => {
    let prList = await this.get(db, sid);
    let prCollection = db.collection('performanceRecordCollection');
    let deleted = false;
    prList.forEach(pr => {
        if(pr.goal_id === goal_id){
            console.log("ya");
            prCollection.deleteOne(pr);
            deleted = true;
        }
    });
    return deleted;
}

exports.update = async(db, sid, goal_id, performanceRecord) => {
    let prCollection = db.collection('performanceRecordCollection');
    const filter = { sid: sid, goal_id: goal_id };
    const updateDocument = {$set: performanceRecord};
    const result = await prCollection.updateOne(filter, updateDocument);
    return result;
}

exports.prInCollection = async(db, performanceRecord) => {
    const prList = await this.get(db, performanceRecord.sid);
    for (const pr in prList) {
        if(prList[pr].goal_id === performanceRecord.goal_id && prList[pr].year === performanceRecord.year){
            return true;
        }
    }
    return false;
}