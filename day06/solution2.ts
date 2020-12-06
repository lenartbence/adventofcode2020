import { readFileSync } from 'fs';

const groups: Set<string>[][] = readFileSync("day06\\input.txt", "utf-8").split("\r\n\r\n").map(x => x.split("\r\n").map(x => new Set(x)));

let count = 0;
groups.forEach(group => {
    group[0].forEach(character => {
        let characterCountInGroup = 0;
        group.forEach(line => {
            if (line.has(character)) {
                characterCountInGroup++;
            }
        })

        if (characterCountInGroup == group.length) {
            count++;
        }
    });
});

console.log("Part 2, count: " + count);