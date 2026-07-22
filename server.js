const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database
require("./config/db");


// Routes
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); 
const adminRoutes = require("./routes/adminRoutes");
console.log(adminRoutes);

app.get("/", (req, res) => {
    res.send("THIS IS THE NEW SERVER");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// API Routes
app.use("/api/admin-auth", adminAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);   // <-- ADD THIS
app.use("/api/admin", adminRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("African Keys API is running...");
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});