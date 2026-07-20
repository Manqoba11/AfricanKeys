const db = require("../config/db");

const dashboard = (req, res) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM users) AS users,
            (SELECT COUNT(*) FROM products) AS products,
            (SELECT COUNT(*) FROM orders) AS orders,
            (SELECT IFNULL(SUM(total),0) FROM orders) AS sales
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);

    });

};

module.exports = {
    dashboard
};