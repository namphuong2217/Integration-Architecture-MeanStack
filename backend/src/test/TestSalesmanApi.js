const sinon = require("sinon");
const chai = require("chai");
const request = require("request");
const should = chai.should();
let expect = chai.expect;

const sid = 90123;

const salesmanController = require("../controllers/salesman-controller");

const base = "http://localhost:8088";

const responseObject = {
    statusCode: 200,
    headers : {
        "content-type": "application/json"
    }
}

const responseBody = {
    status : "success",
    data: {
        "sid": "90123",
        "first_name": "Johna",
        "last_name": "Smith",
        "department": "Sales"
    }
}

describe("Test of salesman contoller", () => {

    describe("when not stubbed (OrangeHRM available)", () => {

        describe("GET /api/salesman/90123", () => {
            it("should return a salesman for a given id", async () => {
                request.get(`${base}/api/salesman/${sid}`, (err, res, body) => {
                    res.statusCode.should.eql(200);

                    const employee = JSON.parse(body);
                    expect("John").to.equal(employee.first_name);
                    expect("Smith").to.equal(employee.last_name);
                    expect("Sales").to.equal(employee.department);
                    expect(sid.toString()).to.equal(employee.sid);
                });
            });
        });
    });

    describe("when stubbed (OrangeHRM is not available)", () => {
        //substitute get requests
        beforeEach(() => {
            this.get = sinon.stub(request, "get");
        });
        afterEach(() => {
            request.get.restore();
        })

        describe("GET /api/salesman/90123", () => {
            it("should return a salesman for a given id", async () => {
                this.get.yields(null, responseObject, JSON.stringify(responseBody));

                let employee = await salesmanController.getEmployee(90123);
                const sid = 90123;
                console.log("BLA1");
                request.get(`${base}/api/salesman/${sid}`, (err, res, body) => {
                    res.statusCode.should.eql(200);
                    body = JSON.parse(body);
                    body.status.should.eql("success");

                    const employee = responseBody.data;
                    expect(employee.first_name).to.equal("John");
                    expect(employee.last_name).to.equal("Smith");
                    expect(employee.department).to.equal("Sales");
                    expect(employee.sid).to.equal(sid.toString());

                });
            });
        });
    });
});