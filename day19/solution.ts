import { readFileSync } from 'fs';

class Expression {
    constructor(value: (depth: number, depthLimit: number) => string) {
        this.getValue = value;
    }

    getValue: (depth: number, depthLimit: number) => string
}

const parseRules = (ruleDefinitions: Array<string>) => {
    const expressions = new Map<string, Expression>();

    for (let line of ruleDefinitions) {
        const lineParts = line.match(/([0-9]+): ([\s\S]*)/);
        const exprId = lineParts[1];
        const characterMatch = lineParts[2].match(/"([a-zA-Z])"/);
        let expr: Expression;

        if (characterMatch) {
            expr = new Expression(() => characterMatch[1]);
        }
        else {
            expr = new Expression((depth: number, depthLimit: number) => {
                const paths = lineParts[2].split("|");
                const groups = new Array<string>();
                for (const ruleReference of paths) {
                    const innerExprs = ruleReference.trim().split(" ").map(x => {
                        if (exprId === x) {
                            return depth < depthLimit ? expressions.get(x).getValue(depth + 1, depthLimit) : "";
                        }
                        return expressions.get(x).getValue(depth, depthLimit);
                    });

                    groups.push(`(${innerExprs.join("")})`);
                }

                return `(${groups.join("|")})`;
            });
        }
        expressions.set(exprId, expr);
    }

    return expressions.get("0").getValue(0, 5);
}

const input = readFileSync("day19\\input.txt", "utf-8").split("\r\n\r\n");

const ruleDefinitions = input[0].split("\r\n");

for (let i = 0; i < ruleDefinitions.length; i++) {
    if (ruleDefinitions[i].startsWith("11:")) {
        ruleDefinitions[i] = "11: 42 31 | 42 11 31";
    }
    else if (ruleDefinitions[i].startsWith("8:")) {
        ruleDefinitions[i] = "8: 42 | 42 8";
    }
}

const pattern = `^${parseRules(ruleDefinitions)}$`;

const matches = new Array<string>();
for (const message of input[1].split("\r\n")) {
    if (message.match(pattern)) {
        matches.push(message);
    }
}

console.log("Matching messages: ", matches.length);