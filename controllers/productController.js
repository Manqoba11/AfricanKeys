// ======================================
// Import the product model.
//
// The controller talks to the model,
// not directly to MySQL.
// ======================================
const productModel = require("../models/productModel");


// ======================================
// Get all products
// ======================================
const getProducts = (req, res) => {

    productModel.getAllProducts((err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);

    });

};


// ======================================
// Get one product
// ======================================
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


// ======================================
// Add a new product
// ======================================
const addProduct = (req, res) => {

    // Read the data sent by the frontend.
    const {
        name,
        category,
        description,
        price,
        image
    } = req.body;

    // Ask the model to save the product.
    productModel.addProduct(

        name,
        category,
        description,
        price,
        image,

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Product added successfully!"
            });

        }

    );

};


// ======================================
// Export ALL functions.
//
// This should appear ONLY ONCE.
// ======================================
module.exports = {

    getProducts,
    getProduct,
    addProduct

};