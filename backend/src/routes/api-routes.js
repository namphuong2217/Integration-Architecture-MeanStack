const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization(),authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(), userApi.getSelf);

//salesman routes
const salesManApiOld = require("../apis/old/salesman-api")
router.post("/salesMan", salesManApiOld.addSalesMan);
router.get("/salesMan/:sid", salesManApiOld.getSalesMan);
router.get("/salesMan", salesManApiOld.getAllSalesMan);
router.delete("/salesMan/:sid", salesManApiOld.deleteSalesMan);
router.delete("/salesMan", salesManApiOld.deleteAllSalesMan);
router.put("/salesMan/:sid", salesManApiOld.updateSalesMan);


//performance record routes
const performanceRecordApi = require("../apis/old/performanceRecord-api")
router.post("/performanceRecord", performanceRecordApi.addPerformanceRecord);
router.get("/performanceRecord/sid/:sid", performanceRecordApi.getPerformanceRecord);
router.delete("/performanceRecord/sid/:sid/goalID/:goalID", performanceRecordApi.deletePerformanceRecord);
router.put("/performanceRecord/sid/:sid/goalID/:goalID", performanceRecordApi.updatePerformanceRecord);

//ADDED END
const salesManApi = require("../apis/salesman-api")
router.get("/salesmanOHRM/:sid", salesManApi.getSalesMan);

module.exports = router;