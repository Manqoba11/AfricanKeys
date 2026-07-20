const db = require("../config/db");

const findAdminByEmail = (email, callback) => {

    const sql = `
        SELECT *
        FROM admin
        WHERE email = ?
    `;

    db.query(sql, [email], callback);

};

module.exports = {
    findAdminByEmail
};