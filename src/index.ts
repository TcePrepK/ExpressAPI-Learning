import express from "express";
const app = express();
// const data = require("./data.json");
const port = process.env.PORT || 3000;

app.get("/", (req: unknown, res: { send: (arg0: string) => void }) => {
    res.send("Hello World");
});

app.get("/players", (req: unknown, res: { send: (arg0: unknown) => void }) => {
    res.send("asd");
});

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});
