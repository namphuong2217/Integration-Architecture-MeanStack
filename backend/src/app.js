/*
    This file acts as the entrypoint for node.js
 */

const express = require('express');
const session = require('express-session');

const multer = require('multer');
const upload = multer();
const app = express();
const crypto = require('crypto');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// MongoDB connection details:
const domain = 'localhost';
const port = '27017';
const username = '';
const password = '';
const databaseName = 'intArch';

app.use(express.json()); //adds support for json encoded bodies
app.use(express.urlencoded({extended: true})); //adds support url encoded bodies
app.use(upload.array()); //adds support multipart/form-data bodies

app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

const apiRouter = require('./routes/api-routes'); //get api-router from routes/api
app.use('/api', apiRouter); //mount api-router at path "/api"
// !!!! attention all middlewares, mounted after the router wont be called for any requests

//preparing database credentials for establishing the connection:
let credentials = '';
if(username){
    credentials = username+':'+password+'@';
}

MongoClient.connect('mongodb://' + credentials + domain + ':' + port + '/').then(async dbo =>{ //connect to MongoDb

    const db = dbo.db(databaseName);
    await initDb(db); //run initialization function
    app.set('db',db); //register database in the express app

    app.listen(8088, () => { //start webserver, after database-connection was established
        console.log('Webserver started.');
    });
});

async function initDb(db){
    if(await db.collection('users').count() < 1){ //if no user exists create admin user
        const userService = require('./services/user-service');
        const User = require("./models/User");

        const adminPassword = crypto.randomBytes(8).toString('base64');
        await userService.add(db, new User('admin', '', 'admin', '', adminPassword, true));

        console.log('created admin user with password: '+adminPassword);
    }
}


