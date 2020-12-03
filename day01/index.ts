import * as fs from 'fs';

const input = fs.readFileSync("day01/input.txt", "utf-8");
const sum = 2020;
const diffs = [];
const lines = input.split("\n");
let myNumber;

for (let i = 0; i < lines.length; i++) {
    const number = parseInt(lines[i], 10);
    const index = diffs.findIndex(x => x == number);
    if (index != -1) {
        myNumber = number;
        break;
    }
    diffs.push(sum - number);
};

console.log(`Part 1 solution: ${myNumber} * ${sum - myNumber} = ${myNumber * (sum - myNumber)}`);