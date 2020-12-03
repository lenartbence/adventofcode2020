import * as fs from 'fs';

const input = fs.readFileSync("day01/input.txt", "utf-8");
const sum = 2020;
const lines = input.split("\n");

let solution;

// idgaf kek
lines.forEach(line => {
    let a = parseInt(line, 10);

    lines.forEach(line => {
        let b = parseInt(line, 10);

        lines.forEach(line => {
            let c = parseInt(line, 10);

            if (a + b + c == sum) {
                solution = a * b * c;
            }
        });
    });
});

console.log(solution);