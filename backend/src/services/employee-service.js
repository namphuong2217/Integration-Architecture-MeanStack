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

const makeHeader = async () => {
    const body = await getToken();
    const token = await body.data.access_token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
}

const header = makeHeader();

const employeeRead = async (sid) => {
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?code=${sid}`;
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    if (!res || res.status !== 200) { return { status: 404, msg: "no targets for sid" }; }
    return { status: 200, payload: await res.data.data[0] };
}

module.exports.employeeRead = employeeRead;

exports.employeesRead = async () => {
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search`;
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    if (!res || res.status !== 200) { return { status: 404, msg: "no targets found" }; }
    return { status: 200, payload: await res.data.data };
}

exports.readEmployeeBonus = async (sid) => {
    const respEmployeeRead = await employeeRead(sid);
    if (respEmployeeRead.status !== 200) { return respEmployeeRead; }
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/${await respEmployeeRead.payload["employeeId"]}/bonussalary`;
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    if (!res || res.status !== 200) { return { status: 404, msg: "no targets for sid" }; }
    return { status: 200, payload: await res.data.data };
}

exports.writeEmployeeBonus = async (sid, bonus) => {
    const salesmanResp = await employeeRead(sid);
    if (salesmanResp.status !== 200) { return salesmanResp; }
    console.log(salesmanResp);
    const url = `https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/${await salesmanResp.payload["employeeId"]}/bonussalary`;
    const qBody = qs.stringify(bonus);
    console.log("URL: " + url);
    console.log("BODY: " + qBody);
    console.log("HEADER: ");
    console.log(await header);
    try {
        await axios.post(url, qBody, await header);
        return { status: 200, msg: "write bonus successful" };
    } catch (error) {
        console.log(error);
        return { status: 500, msg: "could not write bonus" };
    }
}
