const axios = require('axios');

const header = {
    'Content-Type': 'application/json',
    auth: {
        username: 'guest',
        password: 'guest'
    }
}

exports.positionRead = async(salesOrderId) => {
    const url = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${salesOrderId}/position`;
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    if(!res){return {"status" : "error"}}
    return res.data;
}