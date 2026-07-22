const express = require("express");
const router = express.Router();

console.log("orderRoutes loaded");

const orderController = require("../controllers/orderController");

router.get("/test", (req, res) => {
    res.send("Order routes work!");
});

router.post("/", orderController.placeOrder);

router.get("/user/:userId", orderController.getUserOrders);

module.exports = router;

