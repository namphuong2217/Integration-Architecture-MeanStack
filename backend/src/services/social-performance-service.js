exports.get = (db, sid) => {
    let res = db.collection('socialPerformanceCollection').find({sid: sid}).toArray();
    return res;
}

exports.getYearAverage = async(db, sid, year) => {
    let res = await db.collection('socialPerformanceCollection').find({sid: sid, year: year}).toArray();
    let avg = {};
    avg.sid = sid;
    avg.year = year;

    const recordCount = await res.length;

    res.forEach(record => {
        for (const [key, value] of Object.entries(record)) {
            if(key === "_id" || key === "sid" || key === "year") continue;
            if(! avg[key]) avg[key] = {target: 0, actual: 0};
            avg[key].target += value.target / recordCount;
            avg[key].actual += value.actual / recordCount;
        }
    });

    for (const [key, value] of Object.entries(avg)) {
        if(key === "sid" || key === "year") continue;
        value.target = value.target.toFixed(2);
        value.actual = value.actual.toFixed(2);
    }

    return avg;
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