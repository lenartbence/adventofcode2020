"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var groups = fs_1.readFileSync("day06\\input.txt", "utf-8").split("\r\n\r\n").map(function (x) { return x.split("\r\n").map(function (x) { return new Set(x); }); });
var count = 0;
groups.forEach(function (group) {
    group[0].forEach(function (character) {
        var characterCountInGroup = 0;
        group.forEach(function (line) {
            if (line.has(character)) {
                characterCountInGroup++;
            }
        });
        if (characterCountInGroup == group.length) {
            count++;
        }
    });
});
console.log("Part 2, count: " + count);
//# sourceMappingURL=solution2.js.map