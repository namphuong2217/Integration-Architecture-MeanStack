const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;

const orderEvaluationService = require("../services/order-evaluation-service");
const orderEvaluationController = require("../controllers/order-evaluation-controller");
const accounts = require("./testFiles/returnOfOrderEvaluation").accounts;
const salesOrders = require("./testFiles/returnOfOrderEvaluation").salesOrder;

const sid = 90123;

describe("Test of order evaluation contoller", () => {
    describe("when not stubbed (OpenCRX available)", ()=> {
        it("should return the order evaluation for the given sid 90123", async() =>{
            const orderEval = await orderEvaluationController.getOrderEvaluations(sid);

            expect(orderEval).to.length(3);
            expect(orderEval[0].nameProduct).to.equal("HooverClean");
            expect(orderEval[0].client).to.equal("Germania GmbH");
            expect(orderEval[0].clientRanking).to.equal("good");
            expect(orderEval[0].items).to.equal("10.000000000");
        })
    })
    /*
    describe("when stubbed (OpenCRX is not available)", () =>{
        it("should return the order evaluation for the given sid 90123", async () => {

            //Replacement of functions in service (OpenCRX not available)
            sinon.stub(orderEvaluationService, "orderEvaluationsRead").resolves(salesOrders);
            sinon.stub(orderEvaluationService, "accountsRead").resolves(accounts);
            const orderEval = await orderEvaluationController.getOrderEvaluations(sid);

            expect(orderEval).to.length(3);
            expect(orderEval[0].nameProduct).to.equal("HooverClean");
            expect(orderEval[0].client).to.equal("Germania GmbH");
            expect(orderEval[0].clientRanking).to.equal("good");
            expect(orderEval[0].items).to.equal("10.000000000");;
        });
    });

     */
});
