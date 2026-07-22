// Import the MySQL database connection.
const db = require("../config/db");


// =========================================
// Create a new order
// =========================================
const createOrder = (userId, total, callback) => {

    // SQL query to create a new order.
    const sql = `
        INSERT INTO orders (user_id, total)
        VALUES (?, ?)
    `;

    // Execute the SQL query.
    db.query(sql, [userId, total], callback);

};


// =========================================
// Save each product inside the order
// =========================================
const addOrderItem = (orderId, productId, quantity, price, callback) => {

    const sql = `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [orderId, productId, quantity, price],
        callback
    );

};


// =========================================
// Get all orders for one user
// =========================================
const getOrdersByUser = (userId, callback) => {

    // Find every order that belongs
    // to this specific user.
    const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], callback); //Run this SQL.
    //Instead it says:"When MySQL is finished, call this function."That's what a callback is.

};


// Export all functions.
module.exports = {
    createOrder,
    addOrderItem,
    getOrdersByUser
};