// Import the database connection so we can run SQL queries
//const is used to declare a constant variable that cannot be reassigned. In this case, db is a constant that holds the database connection object.
const db = require("../config/db");


// ======================================================
// Create a new order
// ======================================================
//
// This function inserts a new order into the orders table.
//
// Parameters:
// userId   -> the ID of the logged-in customer
// total    -> total price of the order
// callback -> function that runs after the query finishes
//
const createOrder = (userId, total, callback) => {

    // SQL query to insert a new order
    const sql = `
        INSERT INTO orders (user_id, total)
        VALUES (?, ?)
    `;

    // Execute the query
    // The ? values are replaced with userId and total
    db.query(sql, [userId, total], callback);

};


// ======================================================
// Add products to an order
// ======================================================
//
// One order can contain many products.
//
// Example:
//
// Order #5
// 2 × Sliding Door
// 1 × Window
//
// Each product is saved in the order_items table.
//
const addOrderItem = (
    orderId,
    productId,
    quantity,
    price,
    callback
) => {

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


// ======================================================
// Get all orders for one customer
// ======================================================
//
// This is used on:
//
// My Orders page
//
// Example:
//
// Logged-in user ID = 3
//
// SQL:
//
// SELECT * FROM orders
// WHERE user_id = 3
//
const getOrdersByUser = (userId, callback) => {

    const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], callback);

};


// ======================================================
// Export all functions
// ======================================================
//
// This makes the functions available in:
//
// controllers/orderController.js
//
module.exports = {

    createOrder,

    addOrderItem,

    getOrdersByUser

};