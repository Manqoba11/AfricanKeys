router.get("/test", (req, res) => {
    res.send("Order routes work!");
});
console.log("orderRoutes loaded");
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

console.log("orderController =", orderController);
console.log("placeOrder =", orderController.placeOrder);

router.post("/", orderController.placeOrder);
router.get("/user/:userId", orderController.getUserOrders);

module.exports = router;