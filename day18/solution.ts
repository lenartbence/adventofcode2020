import { readFileSync } from 'fs';

const addOperator = (a: number, b: number): number => {
    return a + b;
}

const multiplyOperator = (a: number, b: number): number => {
    return a * b;
}

// Ugly solution, does not work with part 1. nvm
const evaluateExpression = (expr: string): number => {
    expr = expr.replace(/ /g, "");

    let operator;
    let operatorPosition = -1;
    let nextOperatorIndex;
    let previousOperatorFoundIndex = -1;
    let leftSideStart = 0;
    let parenthesisIndex = -1;
    let parenthesisEndIndex;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === "(") {
            parenthesisIndex = i;
            continue;
        }
        if (expr[i] === ")") {
            parenthesisEndIndex = i;
            const partResult = evaluateExpression(expr.substring(parenthesisIndex + 1, parenthesisEndIndex));
            return evaluateExpression(expr.substring(0, parenthesisIndex) + partResult + expr.substring(parenthesisEndIndex + 1));
        }
        if (expr[i] === "+") {
            if (operator != addOperator) {
                leftSideStart = previousOperatorFoundIndex + 1;
                operatorPosition = i;
                operator = addOperator;
                nextOperatorIndex = undefined;
            }
            else if (operator) {
                nextOperatorIndex = nextOperatorIndex ? nextOperatorIndex : i;
            }
            previousOperatorFoundIndex = i;
        }
        if (expr[i] === "*") {
            if (!operator) {
                operatorPosition = i;
                operator = multiplyOperator;
            }
            else {
                nextOperatorIndex = nextOperatorIndex ? nextOperatorIndex : i;
            }
            previousOperatorFoundIndex = i;
        }
    }

    if (!operator) {
        return parseInt(expr);
    }

    nextOperatorIndex = nextOperatorIndex ? nextOperatorIndex : expr.length;

    const leftSide = parseInt(expr.substring(leftSideStart, operatorPosition));
    const rightSide = parseInt(expr.substring(operatorPosition + 1, nextOperatorIndex));
    const result = operator(leftSide, rightSide);
    return evaluateExpression(expr.substring(0, leftSideStart) + result + expr.substring(nextOperatorIndex));
}

const expressions = readFileSync("day18\\input.txt", "utf-8").split("\r\n");
const results = new Array<number>();

for (const expr of expressions) {
    results.push(evaluateExpression(expr));
}

let sum = 0;
for (const num of results) {
    console.log(num);
    sum += num;
}

console.log(" sum: " + sum);