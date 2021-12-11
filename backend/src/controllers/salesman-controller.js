const salesManService = require("../services/salesman-service");
const SalesMan = require("../models/SalesMan");


exports.getEmployee = async function(sid) {
    const resp = await salesManService.employeeRead(sid)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp};
    const salesMan = new SalesMan(resp["code"], resp["firstName"], resp["lastName"], "Sales");

    return salesMan;
}