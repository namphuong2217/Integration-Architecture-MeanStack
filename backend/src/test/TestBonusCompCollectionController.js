const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;
const User = require("../models/User");
const APP = require("../app");

const bonusCompCollectionController = require("../controllers/bonus-comp-collection-controller");
const bonusCompCollectionService = require("../services/bonus-comp-collection-service");

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
    socialPerformance: {},
    approvedByCEO: false,
    approvedByHR: false,
    bonusSocial: 0,
    bonusOrder: 2000,
    bonusTotal: 2000
};

const userHR = new User("901323", "TestHR", "lastname", "HR", "asdf", false);
const userCEO = new User("901323", "TestCEO", "lastname", "Leader", "asdf", false);

describe("Test of order bonus-comp-collection-contoller", () => {
    describe("when not stubbed (services available)", ()=> {
        it("should save the bonusCompCollection and HR approved", async() =>{
            const db = await APP.getDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userHR);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.true;
            expect(savedBonusComp.approvedByCEO).to.be.false;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
        it("should save the bonusCompCollection and CEO approved", async() =>{
            const db = await APP.getDb();
            await bonusCompCollectionController.postBonusComputationCollection(bonusCompCollection, db, userCEO);
            const savedBonusComp = await bonusCompCollectionController.getBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
            expect(savedBonusComp.sid).to.equal(bonusCompCollection.sid);
            expect(savedBonusComp.approvedByHR).to.be.false;
            expect(savedBonusComp.approvedByCEO).to.be.true;
            await bonusCompCollectionService.deleteBonusComputationCollection(bonusCompCollection.sid, bonusCompCollection.year, db);
        })
    })
});
