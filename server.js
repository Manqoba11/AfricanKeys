const express = require("express");

const app = express();

console.log("THIS IS MY SERVER FILE");

app.get("/", (req, res) => {
    res.send("ROOT WORKS");
});

app.get("/api/products", (req, res) => {
    res.send("PRODUCTS WORK");
});

app.listen(3000, () => {
    console.log("SERVER RUNNING");
});