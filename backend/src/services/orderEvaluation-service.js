const axios = require('axios');

const header = {
    'Content-Type': 'application/json',
    auth: {
        username: 'guest',
        password: 'guest'
    }
}

exports.orderEvaluationsRead = async() => {
    const url = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder";
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });

    return res.data;
}

exports.accountsRead = async() => {
    const url = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account";
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    return res.data;
}