const db = require("../config/db");

const getAllProducts = (callback) => {

    const sql = `
        SELECT * FROM products
        ORDER BY id
    `;

    db.query(sql, callback);
};

const getProductById = (id, callback) => {

    const sql = `
        SELECT * FROM products
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};

module.exports = {
    getAllProducts,
    getProductById
};