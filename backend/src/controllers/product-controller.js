const productService = require("../services/product-service");

exports.getProductName = async function(productId) {
    const resp = await productService.readProductName(productId);
    if(resp.status !== 200){return resp;}
    return resp.payload.name;
}

exports.getNumberOfProducts = async function() {
    const resp = await productService.readProducts();
    if(resp.status !== 200){return resp;}
    return {status: 200, numberOfProducts: resp.payload["@total"]};
}

