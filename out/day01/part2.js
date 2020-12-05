"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync("day01/input.txt", "utf-8");
var sum = 2020;
var lines = input.split("\n");
var solution;
// idgaf kek
lines.forEach(function (line) {
    var a = parseInt(line, 10);
    lines.forEach(function (line) {
        var b = parseInt(line, 10);
        lines.forEach(function (line) {
            var c = parseInt(line, 10);
            if (a + b + c == sum) {
                solution = a * b * c;
            }
        });
    });
});
console.log(solution);
//# sourceMappingURL=part2.js.map