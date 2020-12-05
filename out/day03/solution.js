"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var cellType;
(function (cellType) {
    cellType[cellType["blank"] = 0] = "blank";
    cellType[cellType["tree"] = 1] = "tree";
})(cellType || (cellType = {}));
var initializeMap = function (input) {
    var lines = input.split("\r\n");
    var rows = [];
    lines.forEach(function (line) {
        var row = [];
        for (var i = 0; i < line.length; i++) {
            row.push(line[i] == '.' ? cellType.blank : cellType.tree);
        }
        rows.push(row);
    });
    return rows;
};
var map = initializeMap(fs.readFileSync("day03/input.txt", "utf-8"));
var slide = function (horizontalMovement, verticalMovement) {
    var i = 0;
    var j = 0;
    var treeCounter = 0;
    while (i < map.length) {
        if (map[i][j] == cellType.tree) {
            treeCounter++;
        }
        i += verticalMovement;
        j += horizontalMovement;
        if (j >= map[0].length) {
            j -= map[0].length;
        }
    }
    return treeCounter;
};
var part1 = function () {
    var treesEncountered = slide(3, 1);
    console.log("Part 1, encountered " + treesEncountered + " trees.");
};
var part2 = function () {
    var encounters = [];
    encounters.push(slide(1, 1));
    encounters.push(slide(3, 1));
    encounters.push(slide(5, 1));
    encounters.push(slide(7, 1));
    encounters.push(slide(1, 2));
    var product = 1;
    encounters.forEach(function (element) {
        product *= element;
    });
    console.log("Part 2, product of encounters: " + product);
};
part1();
part2();
//# sourceMappingURL=solution.js.map