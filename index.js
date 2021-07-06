const express = require("express");
const app = express();
const data = require("./data.json");
cons
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/players", (req, res) => {
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`)
})