console.log("orderController loaded");
const orderModel = require("../models/orderModel");

const placeOrder = (req, res) => {

    const { userId, cart, total } = req.body;

    if (!userId || !cart || cart.length === 0) {
        return res.status(400).json({
            message: "Invalid order."
        });
    }

    orderModel.createOrder(userId, total, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        const orderId = result.insertId;

        let completed = 0;

        cart.forEach(item => {

            orderModel.addOrderItem(

                orderId,
                item.id,
                item.qty,
                item.price,

                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    completed++;

                    if (completed === cart.length) {

                        res.json({
                            message: "Order placed successfully!"
                        });

                    }

                }

            );

        });

    });

};

module.exports = {
    placeOrder
};
