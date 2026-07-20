const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getProducts);

// Get one product
router.get("/:id", productController.getProduct);

module.exports = router;