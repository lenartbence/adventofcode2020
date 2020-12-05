"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync("day01/input.txt", "utf-8");
var sum = 2020;
var diffs = [];
var lines = input.split("\n");
var myNumber;
var _loop_1 = function (i) {
    var number = parseInt(lines[i], 10);
    var index = diffs.findIndex(function (x) { return x == number; });
    if (index != -1) {
        myNumber = number;
        return "break";
    }
    diffs.push(sum - number);
};
for (var i = 0; i < lines.length; i++) {
    var state_1 = _loop_1(i);
    if (state_1 === "break")
        break;
}
;
console.log("Part 1 solution: " + myNumber + " * " + (sum - myNumber) + " = " + myNumber * (sum - myNumber));
//# sourceMappingURL=index.js.map