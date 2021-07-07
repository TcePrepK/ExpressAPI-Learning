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
    in1: Element;
    in2: Element;
    out1: Element;
}

interface ElementRequest {
    name: string;
    color: string;
}

interface OperationRequest {
    token: string;
    operation: boolean;
    id: number;
}
