const sinon = require("sinon");
const chai = require("chai");
const request = require("request");
const should = chai.should();
let expect = chai.expect;
const orangeHRMService = require("../services/salesman-service");
//const orangeHRMReturn = require("./testFiles/returnOfSalesmanOHRM.json");



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

const resp = {
    firstName: 'JohnAAA',
    middleName: 'Steven',
    lastName: 'Smith',
    code: '90123',
    employeeId: '2',
    fullName: 'John Steven Smith',
    status: null,
    dob: '1982-11-15',
    driversLicenseNumber: '',
    licenseExpiryDate: null,
    maritalStatus: null,
    gender: null,
    otherId: '',
    nationality: null,
    unit: 'Sales',
    jobTitle: 'Senior Salesman',
    supervisor: [ { name: 'Michael Moore', id: ' 7' } ]
}

describe("Test of salesman contoller", () => {

    describe("when not stubbed (use original version)", ()=> {
        it("should return a single user for a given sid", async() =>{

            const sid = 90123
            let employee = await salesmanController.getEmployee(sid);

            expect(employee.first_name).to.equal("John");
            expect(employee.last_name).to.equal("Smith");
            expect(employee.department).to.equal("Sales");
            expect(employee.sid).to.equal(sid.toString());
        })
    })

    describe("when stubbed (OrangeHRM is not available)", () =>{
        //substitute get requests
        beforeEach( ()=> {
            this.get = sinon.stub(request, "get");
        });
        afterEach( () => {
            request.get.restore();
        })

        describe("GET /api/salesman/90123",  () => {
            it("should return a salesman for a given id", async () => {

                //Replacement of employeeRead
                sinon.stub(orangeHRMService, "employeeRead").resolves(resp);

                let employee = await salesmanController.getEmployee(90123);

                console.log(employee)
            });
        });

    });
});