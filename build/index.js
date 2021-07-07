"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// const data = require("./data.json");
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/players", (req, res) => {
    res.send("asd");
});
app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});
