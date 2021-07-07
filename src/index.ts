import express, { Application, json, request, Request, Response } from "express";
import dataStore from "nedb";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";

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

// POSTS
app.post("/recipeOperations", (req: Request, res: Response) => {
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

function recipeOperations(token: string, operation: boolean, id: string) {
    fetch("http://localhost:3000/recipeOperations", {
        method: "POST",
        body: JSON.stringify({ token, operation, id }), // The data
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

recipeOperations("RandomTokenForNow", true, "muzZTUM0EZZFhMtA");
