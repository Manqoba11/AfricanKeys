const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

console.log("orderController =", orderController);
console.log("placeOrder =", orderController.placeOrder);

router.post("/", orderController.placeOrder);

module.exports = router;