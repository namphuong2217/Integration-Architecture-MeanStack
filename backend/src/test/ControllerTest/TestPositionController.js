const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;
const positionService = require("../../services/position-service");
const positionController = require("../../controllers/position-controller");
const returnedSalesmanObj = require("../testFiles/returnOfSalesmanOHRM").returnObj;

const salesOrderId = "9DXSKIH1RCHD5H2MA4T2TYJFL";
const listPosition = [{
    name: "name",
    amount: "10.000000000",
    productVcard: "9JMBMVTX2CSMHH2MA4T2TYJFL"
}];

const positionServiceResp =
    JSON.parse(
    '{"objects": [{"quantity": "10.000", "product": {"@href": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/9JMBMVTX2CSMHH2MA4T2TYJFL"}}]}'
    );

describe("Test of salesman contoller", () => {
    describe("when not stubbed (OrangeHRM available)", ()=> {
        it("request of position for valid orderId", async() =>{
            const positions = await positionController.getPositionsForOrder(salesOrderId);
            expect(positions.length).to.equal(1);
            expect(positions[0].orderVcard).to.equal(salesOrderId);
            expect(positions[0].amount).to.equal("10.000000000");
            expect(positions[0].productVcard).to.equal("9JMBMVTX2CSMHH2MA4T2TYJFL");
        })
        it("request of position for invalid orderId", async() =>{
            const positions = await positionController.getPositionsForOrder("invalidReq");
            expect(positions.length).to.equal(0);
        })
    })

    describe("when stubbed", () =>{
        it("should return a salesman for a given id", async () => {
            sinon.stub(positionService, "readPosition").resolves({status:200, payload: positionServiceResp});
            let positions = await positionController.getPositionsForOrder(salesOrderId);
            sinon.restore();
            expect(positions.length).to.equal(1);
            expect(positions[0].orderVcard).to.equal(salesOrderId);
            expect(positions[0].amount).to.equal("10.000");
            expect(positions[0].productVcard).to.equal("9JMBMVTX2CSMHH2MA4T2TYJFL");
        });
    });
});
