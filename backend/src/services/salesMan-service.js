/**
 * inserts a new salesMan into database
 * @param db target database
 * @param {User} user new user
 * @return {Promise<any>}
 */
exports.add = async function (db, salesMan){
    return (await db.collection('salesMan').insertOne(salesMan)).insertedId; //return unique ID
}

/**
 * retrieves salesMan from database by its username
 * @param db source database
 * @param {string} username
 * @return {Promise<User>}
 */
exports.get = function (db, sid){
    return db.collection('salesMan').findOne({sid : sid});
}

//SHOW WHOLE COLLECTION
//db.collection("salesMan").find().forEach(element => console.log(element));
//db.collection("salesMan").drop();