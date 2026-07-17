const express = require("express");

console.log("✅ productRoutes.js loaded");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET /api/products called");
    res.json({
        message: "Products route is working!"
    });
});

router.get("/:id", (req, res) => {
    console.log("GET /api/products/:id called");
    res.json({
        id: req.params.id
    });
});

module.exports = router;