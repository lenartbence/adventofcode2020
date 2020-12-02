import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf-8");

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
    diffs.push(2020 - number);
};

console.log(`${myNumber} * ${2020 - myNumber} = ${myNumber * (2020 - myNumber)}`);