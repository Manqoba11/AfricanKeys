const express = require("express");
const router = express.Router();

// Import the product controller.
// The controller contains the code
// that will handle product requests.
const productController = require("../controllers/productController");

// =====================================
// GET all products
// URL:
// GET /api/products
// =====================================
router.get("/", productController.getProducts);

// =====================================
// ADD a new product
// URL:
// POST /api/products
// =====================================
router.post("/", productController.addProduct);

module.exports = router;
