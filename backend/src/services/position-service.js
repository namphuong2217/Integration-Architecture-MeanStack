const axios = require('axios');
const headerCRX = require("./auth/headerCRX")

const header = headerCRX.header;

exports.readPosition = async(salesOrderId) => {
    const url = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${salesOrderId}/position`;
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    if(!res || res.status !== 200){return {status: 500, msg: "fetch position error"}}
    return {"status": 200, payload: res.data};
}