"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var groups = fs_1.readFileSync("day06\\input.txt", "utf-8").split("\r\n\r\n").map(function (x) { return x.replace(/\r\n/g, ""); });
var charSets = [];
groups.forEach(function (group) {
    var set = new Set();
    for (var i = 0; i < group.length; i++) {
        set.add(group[i]);
    }
    charSets.push(set);
});
var count = 0;
charSets.forEach(function (set) {
    count += set.size;
});
console.log("Part 1: " + count);
//# sourceMappingURL=solution.js.map