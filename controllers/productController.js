const productModel = require("../models/productModel");

const getProducts = (req, res) => {

    productModel.getAllProducts((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};

const getProduct = (req, res) => {

    const id = req.params.id;

    productModel.getProductById(id, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        res.json(results[0]);

    });

};

module.exports = {
    getProducts,
    getProduct
};