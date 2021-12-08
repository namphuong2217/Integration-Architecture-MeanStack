const productService = require("../services/product-service");

exports.getProductName = async function(productId) {
    const resp = await productService.productNameRead(productId)
        .catch((error) => {
            console.log(error);
        });
    if(resp.status){return resp};
    return resp["name"];
}

