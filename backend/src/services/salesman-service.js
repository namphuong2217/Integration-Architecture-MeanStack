const axios = require('axios');
const qs = require("query-string");

const getToken = () => {
    return axios({
        method: 'post',
        url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken',
        data: {
            client_id: 'api_oauth_id',
            client_secret: 'oauth_secret',
            grant_type: 'password',
            username: 'Wagner',
            password: '*Safb02da42Demo$'
        }
    });
}

const makeHeader = async() => {
    const body = await getToken();
    const token = await body.data.access_token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
}

const header = makeHeader();

const employeeRead = async(sid) => {
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?code=${sid}`;
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    if(!res){return {"status" : "employee not found"}}
    return res.data.data[0];
}

module.exports.employeeRead = employeeRead;

exports.salesManBonusWrite = async(req, sid) => {
    const salesman = await employeeRead(sid);
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/${await salesman["employeeId"]}/bonussalary`;
    const qBody = qs.stringify(req.body);
    console.log(qBody);
    const res = await axios.post(url, qBody, await header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

exports.salesManBonusRead = async(sid) => {
    const salesman = await employeeRead(sid);
    if(salesman.status){return salesman;}
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/${await salesman["employeeId"]}/bonussalary`;
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    return res.data;
}
