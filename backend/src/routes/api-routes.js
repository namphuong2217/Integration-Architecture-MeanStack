const express = require('express');
const router = express.Router();
const { checkAuthorization } = require('../middlewares/auth-middleware');

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', authApi.logout);
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

router.post("/register", checkAuthorization(), authApi.register);

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization("universal"), userApi.getSelf);


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
const salesManApi = require("../apis/employee-api")
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
router.get("/salesman/:sid", checkAuthorization("universal"), salesManApi.getEmployee);

/**
 * @swagger
 * /api/salesmen:
 *  get:
 *      summary: Returns all salesmen of company
 *      tags: [Salesman]
 *      responses:
 *          200:
 *              description: All salesmen of company
 *              contents:
 *                  application/json
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Salesman'
 */
router.get("/salesmen", checkAuthorization("universal"), salesManApi.getEmployees);

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

/*
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

router.post("/salesman/:sid/bonus", checkAuthorization("postBonus"), salesManApi.postEmployeeBonus);
 */
/*
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

router.get("/salesman/:sid/bonus/:year",checkAuthorization("postBonus"), salesManApi.getEmployeeBonus);

 */

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


//Social Performance
/**
*@swagger
*components:
*   schemas: 
*       Social Performance:
*           type: object
*           required:
*               - sid
*               - issuerID
*               - year
*               - leadership_competence
*               - openness
*               - social_behaviour 
*               - attitude
*               - comm_skills
*               - integrity
*           properties:
*               sid: 
*                   type: string
*                   description: Salesman ID
*               issuerID:
*                   type: string
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
*               sid: "1"
*               issuerID: "2"
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
router.post("/socialPerformance", checkAuthorization("postSocialPerformance"), socialPerformanceAPI.addSocialPerformance);

/*
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

router.delete("/socialPerformance/:sid/:year", socialPerformanceAPI.deleteSocialPerformance);
 */

//Bonus Computation Collection
/**
*@swagger
*components:
*   schemas: 
*       Bonus Computation collection:
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
*                   type: array
*                   items:
*                       type: Order Evaluation Object
*                   description: Array of Order Evaluations
*               socialPerformance: 
*                   type: object
*                   description: Social Performance Object
*               approvedByCEO:
*                   type: boolean
*                   description: true if already approved by CEO
*               approvedByHR:
*                   type: boolean
*                   description: true if already approved by HR
*               bonusSocial:
*                   type: array
*                   description: array of bonuses for social performance
*               bonusOrder:
*                   type: array
*                   description: array of bonuses for order evaluation
*               bonusSocialTotal:
*                   type: Number
*               bonusOrderTotal:
*                   type: Number
*               bonusTotal:
*                   type: Number
*           example:
*               salesman: {}
*               orderEvalution: {}
*               socialPerformance: {}
*/

/**
 * @swagger
 * tags:
 *  name: Bonus Computation Collection
 *  description: The Bonus Computation Collection Managing API
 */
const bonusCompCollectionApi = require("../apis/bonus-comp-collection-api");

/**
 * @swagger
 * /api/bonusCompCollection/{sid}:
 *  get:
 *      summary: Returns all necessary collections to compute the bonus for a given SID
 *      tags: [Bonus Computation Collection]
 *      parameters:
 *          - in: path
 *            name: sid
 *            schema: 
 *              type: string
 *            required: true
 *            description: The Salesman ID
 *      responses:
 *          200:
 *              description: Collections to compute the bonus for a given SID
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Bonus Computation Collection'
 */
router.get("/bonusCompCollection/:sid/:year", checkAuthorization("universal"), bonusCompCollectionApi.getBonusCompCollection)

/**
 * @swagger
 * /api/approvedBonuses/{year}:
 *  get:
 *      summary: Returns all approved bonuses for a given year
 *      tags: [Bonus Computation Collection]
 *      parameters:
 *          - in: path
 *            name: year
 *            schema:
 *              type: Number
 *            required: true
 *            description: year
 *      responses:
 *          200:
 *              description: Collections of approved bonuses for a given sid
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Bonus Computation Collection'
 */
router.get("/approvedBonuses/:year", checkAuthorization("universal"), bonusCompCollectionApi.getApprovedBonuses);


/**
 * @swagger
 * /api/bonusCompCollection:
 *  post:
 *      summary: Saves the given bonus computation collection in the database
 *      tags: [Bonus Computation Collection]
 *      responses:
 *          200:
 *              description: Collection was successfully saved
 *          500:
 *              description: Collection is already approved
 *          401:
 *              description: Permission error
 */
router.post("/bonusCompCollection", checkAuthorization("postBonus"), bonusCompCollectionApi.postBonusCompCollection);

/**
 * @swagger
 * /api/bonusSocialPerformance:
 *  put:
 *      summary: Updates social performance and target values changed by HR
 *      tags: [Bonus Computation Collection]
 *      responses:
 *          200:
 *              description: Collection was successfully saved
 *          401:
 *              description: Permission error
 */
router.put("/bonusSocialPerformance", checkAuthorization("updateBonusSocialPerformance"), bonusCompCollectionApi.updateBonusSocialPerformance);

//SOCIAL PERFORMANCE TARGET
/**
 *@swagger
 *components:
 *   schemas:
 *       Social Performance Target:
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
 *                   type: string
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
 *               sid: "1"
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
 *  name: Social Performance Target
 *  description: Api of social performance targets
 */
const socialPerformanceTargetAPI = require("../apis/social-performance-targets-api");

/**
 * @swagger
 * api/socialPerformanceTargets/{sid}/{year}:
 *  get:
 *      summary: Returns the social performance target for a given sid and year
 *      tags: [Social Performance Target]
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
 *              description: Social Performance Target for a given sid and year
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Social Performance Target'
 *          404:
 *              description: No targets found for given sid
 */
router.get("/socialPerformanceTargets/:sid/:year", checkAuthorization("postTargets"), socialPerformanceTargetAPI.get);

/**
 * @swagger
 * api/hasRatedSocialPerformance/{year}:
 *  get:
 *      summary: Returns all sids that rated the user set in session for a given year
 *      tags: [Social Performance Target]
 *      parameters:
 *          - in: path
 *            name: year
 *            schema:
 *              type: string
 *            required: true
 *            description: The Year of Social Performance Record
 *      responses:
 *          200:
 *              description: Array of sids that rated the user in session for a given year
 *              contents:
 *                  application/json
 *              schema:
 *                  type: array
 *                  items:
 *                      type: string
 */
router.get("/hasRatedSocialPerformance/:year", checkAuthorization("universal"), socialPerformanceAPI.hasRated);

/**
 * @swagger
 * api/socialPerformanceTargetExist/{year}:
 *  get:
 *      summary: Returns the social performance target for a given year
 *      tags: [Social Performance Target]
 *      parameters:
 *          - in: path
 *            name: year
 *            schema:
 *              type: string
 *            required: true
 *            description: The Year of Social Performance Record
 *      responses:
 *          200:
 *              description: Social Performance Target for sid and year
 *              contents:
 *                  application/json
 *              schema:
 *                  type: object
 *                  items:
 *                      $ref: '#/components/schemas/Social Performance Target'
 *          400:
 *              description: No targets found for given sid
 */
router.get("/socialPerformanceTargetsExist/:year", checkAuthorization("universal"), socialPerformanceTargetAPI.getTargetsExistArray);

/**
 * @swagger
 * api/socialPerformanceTargets:
 *  post:
 *      summary: Saves the social performance target object in the database
 *      tags: [Social Performance Target]
 *      responses:
 *          200:
 *              description: Social Performance Target successfully saved
 *          401:
 *              description: You can't rate yourself
 *          500:
 *              description: Targets are already in collection
 */
router.post("/socialPerformanceTargets/", checkAuthorization("postTargets"), socialPerformanceTargetAPI.add);

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Api of products
 */
const productAPI = require("../apis/product-api");

/**
 * @swagger
 * api/numberOfProducts:
 *  get:
 *      summary: Retrieves the number of products
 *      tags: [Product]
 *      responses:
 *          200:
 *              description: number of products in company
 *          500:
 *              description: Error fetching data
 */
router.get("/numberOfProducts/", productAPI.getNumberOfProducts)

/**
 * @swagger
 * tags:
 *  name: Sales
 *  description: Api of Sales
 */
const salesAPI = require("../apis/order-evaluation-api");

/**
 * @swagger
 * api/totalNumberOfSales/{year}:
 *  get:
 *      summary: Retrieves the total number of sale orders for a given year
 *      tags: [Sales]
 *      parameters:
 *          - in: path
 *            name: year
 *            schema:
 *              type: string
 *            required: true
 *            description: The Year of the sales
 *      responses:
 *          200:
 *              description: number of positions
 *          500:
 *              description: Error fetching data
 */
router.get("/totalNumberOfSales/:year", salesAPI.getTotalSales)

module.exports = router;