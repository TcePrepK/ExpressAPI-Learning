export interface Element {
    name: string;
    color: string;
}

export interface Recipe {
    in1: Element;
    in2: Element;
    out1: Element;
}

export interface RecipeRequest {
    input1: string;
    input2: string;
    output: string;
}

export interface ElementRequest {
    name: string;
    color: string;
}

export interface OperationRequest {
    token: string;
    operation: boolean;
    id: string;
}
