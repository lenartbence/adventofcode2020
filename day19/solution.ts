import { readFileSync } from 'fs';
import { isConstructorDeclaration } from 'typescript';

class Expression {
    constructor(value: () => string) {
        this.getValue = value;
    }

    getValue: () => string
}

const parseRules = (ruleDefinitions: string) => {
    const expressions = new Map<string, Expression>();

    for (const line of ruleDefinitions.split("\r\n")) {
        const lineParts = line.match(/([0-9]+): ([\s\S]*)/);
        const exprId = lineParts[1];
        const characterMatch = lineParts[2].match(/"([a-zA-Z])"/);
        let expr: Expression;

        if (characterMatch) {
            expr = new Expression(() => characterMatch[1]);
        }
        else {
            expr = new Expression(() => {
                const paths = lineParts[2].split("|");
                const groups = new Array<string>();
                for (const p of paths) {
                    const innerExprs = p.trim().split(" ").map(x => expressions.get(x).getValue());
                    groups.push(`${innerExprs.join("")}`);
                }

                return `(${groups.join("|")})`;
            });
        }
        expressions.set(exprId, expr);
    }

    return expressions.get("0").getValue();
}

const input = readFileSync("day19\\input.txt", "utf-8").split("\r\n\r\n");

const pattern = `^${parseRules(input[0])}$`;

const matches = new Array<string>();
for (const message of input[1].split("\r\n")) {
    if (message.match(pattern)) {
        matches.push(message);
    }
}
console.log("Matching messages: ", matches.length);