const productService = require("../services/product-service");

exports.getProductName = async function(productId) {
    const resp = await productService.readProductName(productId);
    return resp.payload.name;
}

