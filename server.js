const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // if you've created it

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // comment this out if orderRoutes.js doesn't exist yet

// Test Route
app.get("/", (req, res) => {
    res.send("African Keys API is running...");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});