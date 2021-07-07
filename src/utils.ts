interface Element {
    name: string;
    color: string;
}

interface Recipe {
    in1: Element;
    in2: Element;
    out1: Element;
}

interface RecipeRequest {
    input1: string;
    input2: string;
    output: string;
}

interface ElementRequest {
    name: string;
    color: string;
}

interface OperationRequest {
    token: string;
    operation: boolean;
    id: string;
}
