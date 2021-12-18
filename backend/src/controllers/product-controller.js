const productService = require("../services/product-service");

exports.getProductName = async function(productId) {
    const resp = await productService.readProductName(productId)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp}
    return resp.name;
}

