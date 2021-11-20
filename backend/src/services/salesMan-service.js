/**
 * inserts a new salesMan into database
 * @param db target database
 * @param salesman new salesman
 * @return {Promise<insertedId>}
 */
exports.add = async function (db, salesMan){
    try {
        //if(get(db,salesMan.sid)===null){console.log("DOPPELT")}
        return (await db.collection('salesMan').insertOne(salesMan)).insertedId; //return unique ID
    }catch(e){
        return e;
    }
}

/**
 * retrieves salesMan from database by its sid
 * @param db source database
 * @param sid salesman id
 * @return {Promise<salesManr>}
 */
exports.get = function(db, sid){
    try {
        return db.collection('salesMan').findOne({sid : sid});
    }catch(e){
        return e;
    }
}
//module.exports = get;

/**
 * retrieves all salesMan from database by its sid
 * @param db source database
 * @param sid salesman id
 * @return {Promise<salesManr>}
 */
exports.getAll = function (db){
    try {
        return db.collection('salesMan').find({}).toArray();
    }catch(e){
        return e;
    }
}

/**
 * deletes salesMan from database by its sid
 * @param db source database
 * @param sid salesman id
 */
exports.delete = function (db, sid){

    try {
        db.collection('salesMan').deleteOne({sid : sid});
    }catch(e){
        return e;
    }
    return `Salesman mit sid ${sid} wurde gelöscht!`
}

/**
 * updates salesMan from database by its sid
 * @param db source database
 * @param sid salesman id
 */
exports.update = function (db, sid, body){
    try {
        db.collection('salesMan').updateOne({sid: sid}, {$set: body});
    }catch(e){
        return e;
    }
    return `Salesman mit sid ${sid} wurde aktualisiert!`
}

exports.drop = function(db){
    try {
        db.collection('salesMan').drop();
    }catch(e){
        return e;
    }
    return `Alle salesman wurden gelöscht!`
}