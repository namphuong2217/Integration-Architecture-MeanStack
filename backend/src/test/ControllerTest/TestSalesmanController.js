const sinon = require("sinon");
const chai = require("chai");
let expect = chai.expect;
const orangeHRMService = require("../../services/employee-service");
const salesmanController = require("../../controllers/employee-controller");
const returnedSalesmanObj = require("../testFiles/returnOfSalesmanOHRM").returnObj;

describe("Test of salesman contoller", () => {
    describe("when not stubbed (OrangeHRM available)", ()=> {
        it("should return a single user for the given sid 90123", async() =>{
            const employee = await salesmanController.getEmployee(sid);

            expect(employee.first_name).to.equal("John");
            expect(employee.last_name).to.equal("Smith");
            expect(employee.department).to.equal("Sales");
            expect(employee.sid).to.equal(sid.toString());
        })
        it("should return \"user nor found\" for the given sid 2", async() =>{
            const resp = await salesmanController.getEmployee(2);

            expect(resp.status).to.equal(404);
        })
    })

    describe("when stubbed (OrangeHRM is not available)", () =>{
        it("should return a salesman for a given id", async () => {

            //Replacement of employeeRead in service (OrangeHRM not available
            sinon.stub(orangeHRMService, "employeeRead").resolves({status:200, payload: returnedSalesmanObj});
            let employee = await salesmanController.getEmployee(90123);
            sinon.restore();
            expect(employee.first_name).to.equal("Max");
            expect(employee.last_name).to.equal("Mustermann");
            expect(employee.department).to.equal("Sales");
            expect(employee.sid).to.equal("90000");
        });
        it("should return \"user nor found\" for the given sid 2", async() =>{
            sinon.stub(orangeHRMService, "employeeRead").resolves({"status" : 404});
            const resp = await salesmanController.getEmployee(2);

            expect(resp.status).to.equal(404);
         })
    });
});
