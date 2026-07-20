console.log("✅ adminRoutes loaded");

const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.json({
        message: "Admin dashboard route works!"
    });
});

module.exports = router;