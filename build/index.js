"use strict";
var express = require("express");
var app = express();
var data = require("../data.json");
var port = process.env.PORT || 3000;
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.get("/players", function (req, res) {
    res.send(data);
});
app.post("/hello", function (req, res) {
    res.send(data);
});
app.listen(port, function () {
    console.log("Example app is listening on port http://localhost:" + port);
});
