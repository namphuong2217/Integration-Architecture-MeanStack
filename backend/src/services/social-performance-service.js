exports.get = (db, sid) => {
    let res = db.collection('socialPerformanceCollection').find({sid: sid}).toArray();
    return res;
}

exports.add = async (db, socialPerformance) => {
    return (await db.collection('socialPerformanceCollection').insertOne(socialPerformance)).insertedId; //return unique ID
}

exports.delete = async(db, sid, year) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: sid, year: year };
    const spExists = await spCollection.findOne(filter);
    if(! await spExists) return JSON.stringify({status: "error", message: "social performance not in db"});
    spCollection.deleteOne(filter);
    return JSON.stringify({status: "deleted"});
}

exports.update = async(db, sid, year, socialPerformance) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: sid, year: year };
    const spExists = await spCollection.findOne(filter);
    if(! await spExists) return JSON.stringify({status: "error", message: "social performance not in db"});
    const updateDocument = {$set: socialPerformance};
    const result = await spCollection.updateOne(filter, updateDocument);
    return JSON.stringify({status: "updated"});
}

exports.spInCollection = async(db, socialPerformance) => {
    let spCollection = db.collection('socialPerformanceCollection');
    const filter = { sid: socialPerformance.sid, year: socialPerformance.year };
    const res = spCollection.findOne(filter);
    if(await res) return true;
    return false;
}