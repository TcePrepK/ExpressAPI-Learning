import express, { Application, Request, Response } from "express";
import dataStore from "nedb";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { addRecipeRequest, operateRecipeRequest } from "./operations";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;
const token = fs.readFileSync(path.resolve("token.txt")).toString();

app.listen(port, () => {
    console.log(`Example app is listening on port http://localhost:${port}`);
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

const recipes = new dataStore("recipes.db");
const requests = new dataStore("requests.db");
recipes.loadDatabase();
requests.loadDatabase();

// app.get("/", (req: Request, res: Response) => {
//     res.send("Hello World");
// });

// GETS
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.resolve("static/index.html"));
});

app.get("/requests", (req: Request, res: Response) => {
    requests.find({}, (err: Error, data: RecipeRequest) => {
        res.json(data);
    });
});

app.get("/recipes", (req: Request, res: Response) => {
    recipes.find({}, (err: Error, data: RecipeRequest) => {
        res.json(data);
    });
});

// POSTS
app.post("/operateRecipeRequest", (req: Request, res: Response) => {
    const data: OperationRequest = req.body;
    if (token !== data.token) {
        res.send("Incorrect token");
        return;
    }

    requests.find({ _id: data.id }, (err: Error, result: Array<ElementRequest | RecipeRequest>) => {
        if (err) {
            res.send(err);
            return;
        }

        if (result.length == 0) {
            res.send("No request has been found with given id: " + data.id);
            return;
        }

        requests.remove({ _id: data.id }, {}, (err: Error | null) => {
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

app.post("/addRecipeRequest", (req: Request, res: Response) => {
    const data: RecipeRequest = req.body;

    requests.insert(data);
    res.send("Recipe succesfully added to requests");
});

// const fire: Element = { color: "#ff0000", name: "Fire" };
// const water: Element = { color: "#0000ff", name: "Water" };
// const gas: Element = { color: "#ff00ff", name: "Gas" };

// addRecipeRequest(fire, water, gas);
// operateRecipeRequest("RandomTokenForNow", true, "4NIytFEHsMDuJCY1");
