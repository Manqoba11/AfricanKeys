// ======================================
// Import the MySQL database connection.
//
// This allows us to run SQL queries.
// ======================================
const db = require("../config/db");


// ======================================
// Get all products
//
// This function reads every product
// from the database.
// ======================================
const getAllProducts = (callback) => {

    const sql = `
        SELECT *
        FROM products
        ORDER BY id
    `;

    db.query(sql, callback);

};


// ======================================
// Get one product by its ID
//
// Example:
// id = 5
// ======================================
const getProductById = (id, callback) => {

    const sql = `
        SELECT *
        FROM products
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};


// ======================================
// Add a new product
//
// This saves a new product into MySQL.
// ======================================
const addProduct = (

    name,
    category,
    description,
    price,
    image,

    callback

) => {

    const sql = `
        INSERT INTO products
        (name, category, description, price, image)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            name,
            category,
            description,
            price,
            image
        ],

        callback

    );

};


// ======================================
// Export all functions
//
// Other files can now use them.
// ======================================
module.exports = {

    getAllProducts,
    getProductById,
    addProduct

};