const axios = require('axios');
const headerCRX = require("./auth/headerCRX")

const header = headerCRX.header;

exports.orderEvaluationsRead = async() => {
    const url = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder";
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    if(!res || res.status !== 200){return {status: 500, msg: "error fetch evaluation records"}}
    return {status: 200, payload: res.data};
}

exports.accountsRead = async() => {
    const url = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account";
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    if(!res || res.status !== 200){return {status: 500, msg: "error fetch account read"}}
    return {status: 200, payload: res.data};
}