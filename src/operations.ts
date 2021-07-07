import fetch from "node-fetch";

export function fetchFunction(path: string, request: OperationRequest | RecipeRequest): void {
    fetch("http://localhost:3000/" + path, {
        method: "POST",
        body: JSON.stringify(request), // The data
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
        })
        .catch(err => {
            // handle error
            console.error(err);
        });
}

export function operateRecipeRequest(token: string, operation: boolean, id: string): void {
    fetchFunction("operateRecipeRequest", { token, operation, id });
}

export function addRecipeRequest(input1: string, input2: string, output: string): void {
    fetchFunction("addRecipeRequest", { input1, input2, output });
}
