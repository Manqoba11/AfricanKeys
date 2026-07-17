const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("HOME");
});

app.get("/api/products", (req, res) => {
    res.json({
        success: true,
        message: "API works!"
    });
});

app.listen(3000, () => {
    console.log("Server started");
});