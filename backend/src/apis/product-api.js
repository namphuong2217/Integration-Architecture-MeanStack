const productController = require("../controllers/product-controller");

exports.getNumberOfProducts = async (req, res) => {
    const result = await productController.getNumberOfProducts();
    return res.status(result.status).send(result.numberOfProducts);
}