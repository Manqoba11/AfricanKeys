const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");

const login = (req, res) => {

    const { email, password } = req.body;

    adminModel.findAdminByEmail(email, async (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const admin = results[0];

        const match = await bcrypt.compare(password, admin.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        res.json({
            message: "Admin login successful!",
            admin: {
                id: admin.id,
                fullname: admin.fullname,
                email: admin.email
            }
        });

    });

};

module.exports = {
    login
};