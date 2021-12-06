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

/*
//salesman routes
const salesManApiOld = require("../apis/old/salesman-api")
router.post("/salesManOld", salesManApiOld.addSalesMan);
router.get("/salesManOld/:sid", salesManApiOld.getSalesMan);
router.get("/salesManOld", salesManApiOld.getAllSalesMan);
router.delete("/salesManOld/:sid", salesManApiOld.deleteSalesMan);
router.delete("/salesManOld", salesManApiOld.deleteAllSalesMan);
router.put("/salesManOld/:sid", salesManApiOld.updateSalesMan);


//performance record routes
const performanceRecordApi = require("../apis/old/performanceRecord-api")
router.post("/performanceRecord", performanceRecordApi.addPerformanceRecord);
router.get("/performanceRecord/sid/:sid", performanceRecordApi.getPerformanceRecord);
router.delete("/performanceRecord/sid/:sid/goalID/:goalID", performanceRecordApi.deletePerformanceRecord);
router.put("/performanceRecord/sid/:sid/goalID/:goalID", performanceRecordApi.updatePerformanceRecord);
 */

//SALESMAN

/**
*@swagger
*components:
*   schemas: 
*       Salesman:
*           type: object
*           required:
*               - sid
*               - first_name
*               - last_name
*               - department
*           properties:
*               sid: 
*                   type: int
*                   description: Salesman ID
*               first_name: 
*                   type: string
*                   description: First Name eg. John
*               last_name: 
*                   type: string
*                   description: Last Name eg. Doe
*               department: 
*                   type: string
*                   description: eg. Sales
*           example:
*               sid: 1
*               first_name: John
*               last_name: Doe
*               department: Sales
*/

/**
 * @swagger
 * tags:
 *  name: Salesman
 *  description: The Salesman Managing API
 */

/**
 * @swagger
 * /api/salesman/{sid}:
 *  get:
 *      summary: Returns Salesman specified by SID
 *      tags: [Salesman]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      responses:
 *          200:
 *              description: The Salesman
 *              contents:
 *                  application/json
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Salesman'
 */
const salesManApi = require("../apis/salesman-api")
router.get("/salesman/:sid", salesManApi.getEmployee);
router.post("/salesman/:sid/bonus", salesManApi.postEmployeeBonus);
router.get("/salesman/:sid/bonus", salesManApi.getEmployeeBonus);

//ORDER EVALUATION
const orderEvaluationApi = require("../apis/order-evaluation-api")
router.get("/orderEvaluation/:sid", orderEvaluationApi.getOrderEvaluations);

//Social Performance
const socialPerformanceAPI = require("../apis/social-performance-api")
router.get("/socialPerformance/:sid", socialPerformanceAPI.getSocialPerformance);
router.post("/socialPerformance", socialPerformanceAPI.addSocialPerformance);
router.put("/socialPerformance/:sid/:year", socialPerformanceAPI.updateSocialPerformance);
router.delete("/socialPerformance/:sid/:year", socialPerformanceAPI.deleteSocialPerformance);

//controller
const performanceRecordController = require("../controllers/performance-record-controller");
router.get("/performanceRecord/:sid", performanceRecordController.getPerformanceRecord)

module.exports = router;