const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const signup = async (req, res) => {

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        userModel.createUser(
            fullname,
            email,
            hashedPassword,
            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User registered successfully!"
                });

            }
        );

    } catch (error) {
        res.status(500).json(error);
    }

};

const login = (req, res) => {

    const { email, password } = req.body;

    userModel.findUserByEmail(email, async (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        res.json({
            message: "Login successful!",
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });

    });

};

module.exports = {
    signup,
    login
};