// Import the order model.
//
// The controller uses the model to talk to MySQL.
const orderModel = require("../models/orderModel"); //require() is used to import code from another file


// ==================================================
// Get all orders for one user
// ==================================================
const getUserOrders = (req, res) => {

    console.log("getUserOrders called");
    console.log(req.params.userId);
    // Read the user ID from the URL.
    //
    // Example:
    // GET /api/orders/user/2
    //
    // req.params.userId = 2
    const userId = req.params.userId;

    // Ask the model to get this user's orders.
    orderModel.getOrdersByUser(userId, (err, results) => {

        // If something went wrong...
        if (err) {

            return res.status(500).json(err);

        }

        // Otherwise send the orders back
        // to the browser as JSON.
        res.json(results);

    });

};


// Export the controller functions.
module.exports = {
    placeOrder,
    getUserOrders
};