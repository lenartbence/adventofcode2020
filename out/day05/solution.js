"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var boardingPasses = fs_1.readFileSync("day05\\input.txt", "utf-8").split("\r\n");
var getSeatId = function (boardingPass) {
    var row = narrowLocation(boardingPass.substring(0, 7), 0, 127, "F", "B");
    var column = narrowLocation(boardingPass.substring(7), 0, 7, "L", "R");
    var seatId = row * 8 + column;
    return seatId;
};
var narrowLocation = function (data, first, last, lowerIndicator, upperIndicator) {
    if (first === last) {
        return first;
    }
    var center = first + (last - first) / 2;
    if (data[0] === lowerIndicator) {
        return narrowLocation(data.substring(1), first, Math.floor(center), lowerIndicator, upperIndicator);
    }
    else if (data[0] === upperIndicator) {
        return narrowLocation(data.substring(1), Math.ceil(center), last, lowerIndicator, upperIndicator);
    }
    return -1;
};
var seatIds = boardingPasses.map(getSeatId);
var seatIdsOrderedDescending = seatIds.sort(function (a, b) { return b - a; });
var part1 = function () {
    console.log("Part 1, highest seat ID: " + seatIdsOrderedDescending[0]);
};
var part2 = function () {
    var i = 0;
    while (i < seatIdsOrderedDescending.length - 1 && seatIdsOrderedDescending[i] === seatIdsOrderedDescending[i + 1] + 1) {
        i++;
    }
    if (i == seatIdsOrderedDescending.length - 1) {
        console.log("Could not find seat id");
    }
    else {
        console.log("Part 2, my seat id: " + (seatIdsOrderedDescending[i] - 1));
    }
};
part1();
part2();
//# sourceMappingURL=solution.js.map