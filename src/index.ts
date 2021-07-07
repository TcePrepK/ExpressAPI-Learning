const express = require("express");
const app = express();
const data = require("./data.json");

let port = process.env.PORT || 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Hello World");
});

app.get("/players", (req: any, res: { send: (arg0: any) => void; }) => {
    res.send(data);
});

app.post("/hello", (req: any, res: { send: (arg0: any) => void; }) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});
