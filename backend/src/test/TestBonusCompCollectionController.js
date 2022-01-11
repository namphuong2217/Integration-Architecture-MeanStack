const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;
const User = require("../models/User");
const APP = require("../app");

const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

//todo mongoMock
const initDb = async function(){
    return await APP.getDb();
}

const bonusCompCollection = {
    sid: 1234,
    year: 2018,
    salesman: {
        sid: "1234",
        first_name: "Max",
        last_name: "Mustermann",
        department: "Sales"
    },
    orderEvaluation: [
        {
            nameProduct: "HooverClean",
            client: "Germania GmbH",
            clientRanking: 3,
            items: "10",
            bonus: 400,
            comment: ""
        },
        {
            nameProduct: "HooverClean",
            client: "Dirk Müller GmbH",
            clientRanking: 3,
            items: "25",
            bonus: 1000,
            comment: ""
        },
        {
            nameProduct: "HooverGo",
            client: "Telekom AG",
            clientRanking: 1,
            items: "20",
            bonus: 600,
            comment: ""
        }
    ],
    socialPerformance: {
        sid: 90123,
        year: 2021,
        leadership_competence: {
            target: "4.00",
            actual: "3.00",
            bonus: 18.195919791379,
            comment: ""
        },
        openness: {
            target: "4.00",
            actual: "3.00",
            bonus: 18.195919791379,
            comment: ""
        },
        social_behaviour: {
            target: "4.00",
            actual: "5.00",
            bonus: 98.92327624200769,
            comment: ""
        },
        attitude: {
            target: "4.00",
            actual: "3.00",
            bonus: 18.195919791379,
            comment: ""
        },
        comm_skills: {
            target: "4.00",
            actual: "4.00",
            bonus: 48,
            comment: ""
        },
        integrity: {
            target: "4.00",
            actual: "4.00",
            bonus: 48,
            comment: ""
        }
    },
    approvedByCEO: false,
    approvedByHR: false,
    bonusSocial: 0,
    bonusOrder: 2000,
    bonusTotal: 2000
};

const userHR = new User("901323", "TestHR", "lastname", "HR", "asdf", false);
const userCEO = new User("901323", "TestCEO", "lastname", "Leader", "asdf", false);
const userSales = new User("2323", "TestSalesman", "lastname", "Sales", "asdf", false);

describe("Test of order bonus-comp-collection-contoller postBonusComputationCollection", () => {
    describe("when not stubbed (services available)", ()=> {
        it("should save the bonusCompCollection and HR approved", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.false;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("should save the bonusCompCollection and CEO approved", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userCEO);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.false;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("HR approves already saved BonusCompCollection (byCEO) - with comment orderEvaluation", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionOrder("comment"), db, userCEO);
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.orderEvaluation[0].comment).to.equal("comment1");
            expect(savedBonusComp.orderEvaluation[2].comment).to.equal("comment2");
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("CEO approves already saved BonusCompCollection (byHR) - with comment orderEvaluation", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionOrder("comment"), db, userCEO);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            expect(savedBonusComp.orderEvaluation[0].comment).to.equal("comment1");
            expect(savedBonusComp.orderEvaluation[2].comment).to.equal("comment2");
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("CEO approves twice - no change - with comment orderEvaluation", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionOrder("comment"), db, userCEO);
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionOrder("comment2Approve"), db, userCEO);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.false;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            expect(savedBonusComp.orderEvaluation[0].comment).to.equal("comment1");
            expect(savedBonusComp.orderEvaluation[2].comment).to.equal("comment2");
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("HR approves already saved BonusCompCollection (byCEO) - with comment socialPerformance", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionSocial("comment"), db, userCEO);
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.socialPerformance.leadership_competence.comment).to.equal("comment1");
            expect(savedBonusComp.socialPerformance.comm_skills.comment).to.equal("comment2");
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("CEO approves already saved BonusCompCollection (byHR) - with comment socialPerformance", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionSocial("comment"), db, userCEO);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            expect(savedBonusComp.socialPerformance.leadership_competence.comment).to.equal("comment1");
            expect(savedBonusComp.socialPerformance.comm_skills.comment).to.equal("comment2");
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("HR can't put comments orderEvaluation", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionOrder("comment"), db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.false;
            expect(savedBonusComp.orderEvaluation[0].comment).to.equal("");
            expect(savedBonusComp.orderEvaluation[2].comment).to.equal("");
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("HR can't put comments socialPerformance", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(addCommentsToBonusCompCollectionSocial("comment"), db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userCEO);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.false;
            expect(savedBonusComp.socialPerformance.leadership_competence.comment).to.equal("");
            expect(savedBonusComp.socialPerformance.comm_skills.comment).to.equal("");
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
    })
});

describe("Test of order bonus-comp-collection-contoller getBonusComputationCollection", () => {
    describe("when not stubbed (services available)", ()=> {
        it("salesman not allowed to view other bonus", async() =>{
            const db = await initDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, userSales);
            expect(savedBonusComp).to.be.undefined;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("salesman allowed to view his bonus", async() =>{
            const db = await initDb();
            let newUser = userSales;
            newUser.username="1234"
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db, newUser);
            expect(savedBonusComp).to.be.not.undefined;
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
    })
});


const addCommentsToBonusCompCollectionOrder = function(comment){
    let bonusCompCollectionWithComments = bonusCompCollection;
    bonusCompCollectionWithComments.orderEvaluation[0].comment=`${comment}1`;
    bonusCompCollectionWithComments.orderEvaluation[2].comment=`${comment}2`;
    return bonusCompCollectionWithComments;
}

const addCommentsToBonusCompCollectionSocial = function(comment){
    let bonusCompCollectionWithComments = bonusCompCollection;
    bonusCompCollectionWithComments.socialPerformance.leadership_competence.comment=`${comment}1`;
    bonusCompCollectionWithComments.socialPerformance.comm_skills.comment=`${comment}2`;
    return bonusCompCollectionWithComments;
}