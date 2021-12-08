const axios = require('axios');
const headerCRX = require("./auth/headerCRX")

const header = headerCRX.header;

exports.productNameRead = async(productId) => {
    const url = `https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/${productId}`;
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        });
    if(!res){return {"status" : "error"}}
    return res.data;
}