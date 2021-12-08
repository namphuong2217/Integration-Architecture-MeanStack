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
const salesManApi = require("../apis/salesman-api")
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
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Salesman'
 */
router.get("/salesman/:sid", salesManApi.getEmployee);

/**
*@swagger
*components:
*   schemas: 
*       Bonus:
*           type: object
*           required:
*               - sid
*               - bonus
*           properties:
*               sid: 
*                   type: int
*                   description: Salesman ID
*               bonus: 
*                   type: string
*                   description: Bonus for employee
*           example:
*               sid: 1
*               bonus: 200
*/

/**
 * @swagger
 * /api/salesman/{sid}/bonus:
 *  post:
 *      summary: Adds bonus to salesman
 *      tags: [Salesman]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema:
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bonus'
 *      responses:
 *          200:
 *              description: Not implemented yet
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Bonus'
 */
router.post("/salesman/:sid/bonus", salesManApi.postEmployeeBonus);

/**
 * @swagger
 * /api/salesman/{sid}/bonus:
 *  get:
 *      summary: Gets bonus from salesman
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
 *              description: Not implemented yet
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Bonus'
 */
router.get("/salesman/:sid/bonus", salesManApi.getEmployeeBonus);

//ORDER EVALUATION
/**
*@swagger
*components:
*   schemas: 
*       Order:
*           type: object
*           required:
*               - nameProduct
*               - client
*               - clientRanking
*               - items
*           properties:
*               nameProduct: 
*                   type: String
*                   description: Name of product
*               client: 
*                   type: string
*                   description: Client who the order belongs to
*               clientRanking: 
*                   type: string
*                   description: Ranking by the Client
*               items: 
*                   type: array
*                   items:
*                       type: string
*           example:
*               sid: 1
*               first_name: John
*               last_name: Doe
*               department: Sales
*/

/**
 * @swagger
 * tags:
 *  name: Order
 *  description: The Order Evalution API
 */

const orderEvaluationApi = require("../apis/order-evaluation-api")

/**
 * @swagger
 * /api/orderEvaluation/{sid}:
 *  get:
 *      summary: Returns Salesman specified by SID
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      responses:
 *          200:
 *              description: The Order Evalution
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Order'
 */
router.get("/orderEvaluation/:sid", orderEvaluationApi.getOrderEvaluations);

//Social Performance
/**
*@swagger
*components:
*   schemas: 
*       Social Performance:
*           type: object
*           required:
*               - sid
*               - year
*               - leadership_competence
*               - openness
*               - social_behaviour 
*               - attitude
*               - comm_skills
*               - integrity
*           properties:
*               sid: 
*                   type: int
*                   description: Salesman ID
*               year: 
*                   type: int
*                   description: Year of Social Performance Record
*               leadership_competence: 
*                   type: object
*                   description: Leadership Competence
*               openness: 
*                   type: object
*                   description: Openness
*               social_behaviour: 
*                   type: object
*                   description: Social Behaviour
*               attitude: 
*                   type: object
*                   description: Attitude
*               comm_skills: 
*                   type: object
*                   description: Communication Skills
*               integrity: 
*                   type: object
*                   description: eg. Sales
*           example:
*               sid: 1
*               year: 2021
*               leadership_competence: {target: 3, actual: 4}
*               openness: {target: 3, actual: 4}
*               social_behaviour: {target: 3, actual: 4}
*               attitude: {target: 3, actual: 4}
*               comm_skills: {target: 3, actual: 4}
*               integrity: {target: 3, actual: 4}
*/

/**
 * @swagger
 * tags:
 *  name: Social Performance Record
 *  description: The Social Performance Reocd Managing API
 */


const socialPerformanceAPI = require("../apis/social-performance-api")
/**
 * @swagger
 * /api/socialPerformance/{sid}:
 *  get:
 *      summary: Returns all Social Performance records for SID
 *      tags: [Social Performance Record]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      responses:
 *          200:
 *              description: The Social Performance Record for SID
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Social Performance'
 */
router.get("/socialPerformance/:sid", socialPerformanceAPI.getSocialPerformance);

/**
 * @swagger
 * /api/socialPerformance:
 *  post:
 *      summary: Adds a performance Record to DB
 *      tags: [Social Performance Record]
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Social Performance'
 *      responses:
 *          200:
 *              description: Status, Unique ID
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 */
router.post("/socialPerformance", socialPerformanceAPI.addSocialPerformance);

/**
 * @swagger
 * /api/socialPerformance/{sid}/{year}:
 *  put:
 *      summary: Updates a performance Record in DB
 *      tags: [Social Performance Record]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *          - in: path
 *            name: year
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Year of Social Performance Record
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Social Performance'
 *      responses:
 *          200:
 *              description: Status
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 */
router.put("/socialPerformance/:sid/:year", socialPerformanceAPI.updateSocialPerformance);

/**
 * @swagger
 * /api/socialPerformance/{sid}/{year}:
 *  delete:
 *      summary: Returns Salesman specified by SID
 *      tags: [Social Performance Record]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *          - in: path
 *            name: year
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Year of Social Performance Record
 *      responses:
 *          200:
 *              description: Status
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 */
router.delete("/socialPerformance/:sid/:year", socialPerformanceAPI.deleteSocialPerformance);

//controller
/**
*@swagger
*components:
*   schemas: 
*       Performance Record:
*           type: object
*           required:
*               - salesman
*               - orderEvaluation
*               - socialPerformance
*           properties:
*               salesman: 
*                   type: object
*                   description: Salesman Object
*               orderEvaluation: 
*                   type: object
*                   description: Order Evaluation Object
*               socialPerformance: 
*                   type: object
*                   description: Social Performance Object
*           example:
*               salesman: {}
*               orderEvalution: {}
*               socialPerformance: {}
*/

/**
 * @swagger
 * tags:
 *  name: Performance Record
 *  description: The Performance Record Managing API
 */
const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");

/**
 * @swagger
 * /api/bonusCompCollection/{sid}:
 *  get:
 *      summary: Returns all Performance Records for SID
 *      tags: [Performance Record]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      responses:
 *          200:
 *              description: The Performance Record for SID
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Performance Record'
 */
router.get("/bonusCompCollection/:sid", bonusCompCollectionController.getPerformanceRecord)

module.exports = router;