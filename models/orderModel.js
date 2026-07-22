const db = require("../config/db");

const createOrder = (userId, total, callback) => {

    const sql = `
        INSERT INTO orders (user_id, total)
        VALUES (?, ?)
    `;

    db.query(sql, [userId, total], callback);
};

const addOrderItem = (orderId, productId, quantity, price, callback) => {

    const sql = `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [orderId, productId, quantity, price], callback);
};

module.exports = {
    createOrder,
    addOrderItem
};
const db = require("../config/db");

const getOrdersByUser = (userId, callback) => {

    const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], callback);

};

module.exports = {
    getOrdersByUser
};