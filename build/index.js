"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nedb_1 = __importDefault(require("nedb"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = express_1.default();
const port = Number(process.env.PORT) || 3000;
const token = fs_1.default.readFileSync(path_1.default.resolve("token.txt")).toString();
app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});
app.use(express_1.default.static("public"));
app.use(express_1.default.json({ limit: "1mb" }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
const recipes = new nedb_1.default("recipes.db");
const requests = new nedb_1.default("requests.db");
recipes.loadDatabase();
requests.loadDatabase();
// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World");
// });
// GETS
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("static/index.html"));
});
// POSTS
app.post("/addRecipe", (req, res) => {
    const data = req.body;
    if (token !== data.token) {
        res.send("Incorrect token");
        return;
    }
    requests.find({ _id: data.id }, (err, result) => {
        if (err) {
            res.send(err);
            return;
        }
        if (result.length == 0) {
            res.send("No request has been found with given id: " + data.id);
            return;
        }
        requests.remove({ _id: data.id }, {}, (err) => {
            if (err) {
                res.send(err);
                return;
            }
        });
        if (data.operation) {
            recipes.insert(result[0]);
            res.send(`Request with id: ${data.id}, has been added to recipe list!`);
        }
        requests.persistence.compactDatafile();
    });
});
function recipeOperation(token, operation, id) {
    node_fetch_1.default("http://localhost:3000/addRecipe", {
        method: "POST",
        body: JSON.stringify({ token, operation, id }),
        headers: {
            "Content-Type": "application/json", // The type of data you're sending
        },
    })
        .then(res => {
        if (res.status !== 200) {
            throw "bad-status: " + res.status + " / " + res.statusText;
        }
        return res.text();
    })
        .then(result => {
        console.log(result);
    });
    // .catch(err => {
    //     // handle error
    //     console.error(err);
    // });
}
recipeOperation("RandomTokenForNow", true, "muzZTUM0EZZFhMtA");
