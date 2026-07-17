const db = require("../config/db");

const createUser = (
    fullname,
    phone,
    address,
    suburb,
    province,
    postal_code,
    email,
    password,
    callback
) => {

    const sql = `
        INSERT INTO users
        (fullname, phone, address, suburb, province, postal_code, email, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        fullname,
        phone,
        address,
        suburb,
        province,
        postal_code,
        email,
        password
    ], callback);
};

const findUserByEmail = (email, callback) => {

    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

module.exports = {
    createUser,
    findUserByEmail
};