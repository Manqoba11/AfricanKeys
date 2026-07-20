console.log("✅ adminRoutes loaded");
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/dashboard", (req, res) => {

    console.log("Dashboard route hit");

    adminController.dashboard(req, res);

});

module.exports = router;