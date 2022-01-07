const userService = require('../services/user-service')
const authService = require('../services/auth-service');
const salesManController = require("../controllers/employee-controller");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function (req, res){
    const db = req.app.get('db');//get database from express

    userService.verify(db, req.body).then(user=> { //verify credentials via user-service
        authService.authenticate(req.session, user); //mark session as authenticated
        res.send('login successful');
    }).catch(_=>{
        res.status(401).send('login failed');
    })
}

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function (req, res){
    authService.deAuthenticate(req.session); //destroy session
    res.send('logout successful');
}

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function (req, res){
    if(authService.isAuthenticated(req.session)){ //check via auth-service
        res.send({loggedIn: true});
    }else {
        res.send({loggedIn: false});
    }
}

exports.register = async function (req, res){
    const db = req.app.get('db');//get database from express

    //USER EXISTS IN DB
    if(await userService.get(db, req.body.username)){
        return res.status(401).send({"error" : 'user alredy exists'});
    }
    const employee = await salesManController.getEmployee(req.body.username);
    // USER IS NOT IN COMPANY
    if(employee.status){
        return res.status(401).send({"error" : 'ID does not exist'});
    }
    const User = require("../models/User");
    //REGISTER
    const user = new User(employee.sid, employee.first_name, employee.last_name,
                     employee.department, req.body.password, false);
    userService.add(db, user).then(//mark session as authenticated
        res.send('registration successful')
    ).catch(_=>{
        res.status(401).send('registration failed');
    });
}