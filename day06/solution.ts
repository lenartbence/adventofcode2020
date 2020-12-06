import { readFileSync } from 'fs';

const groups = readFileSync("day06\\input.txt", "utf-8").split("\r\n\r\n").map(x => x.replace(/\r\n/g, ""));

let charSets: Set<string>[] = [];

groups.forEach(group => {
    let set: Set<string> = new Set();
    for (let i = 0; i < group.length; i++) {
        set.add(group[i]);
    }
    charSets.push(set);
});

let count: number = 0;
charSets.forEach(set => {
    count += set.size;
});

console.log("Part 1: " + count);