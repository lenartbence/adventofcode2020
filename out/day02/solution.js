"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input = fs.readFileSync("day02/input.txt", "utf-8").split("\r\n");
var getTargetCharacter = function (text) {
    return text.match(/.(?=:)/)[0];
};
var getMinOccurence = function (text) {
    return parseInt(text.match(/^.*(?=-)/)[0], 10);
};
var getMaxOccurence = function (text) {
    return parseInt(text.match(/(?<=-).*?(?= )/)[0], 10);
};
var getPassword = function (text) {
    return text.match(/(?<=: ).*$/)[0];
};
var isPasswordValid = function (policyAndPassword, rule) {
    var password = getPassword(policyAndPassword);
    var character = getTargetCharacter(policyAndPassword);
    var firstNumber = getMinOccurence(policyAndPassword);
    var secondNumber = getMaxOccurence(policyAndPassword);
    return rule(password, firstNumber, secondNumber, character);
};
var minMaxRule = function (password, firstNumber, secondNumber, character) {
    var pattern = "" + character;
    var regexp = new RegExp(pattern, "g");
    var count = (password.match(regexp) || []).length;
    return count >= firstNumber && count <= secondNumber;
};
var part1 = function () {
    var validPasswordCount = 0;
    input.forEach(function (line) {
        if (isPasswordValid(line, minMaxRule)) {
            validPasswordCount++;
        }
    });
    console.log("Part 1 valid password count: " + validPasswordCount);
};
var positionRule = function (password, firstNumber, secondNumber, character) {
    var firstCharMatches = password[firstNumber - 1] == character;
    var secondCharMatches = password[secondNumber - 1] == character;
    return (firstCharMatches && !secondCharMatches) || (!firstCharMatches && secondCharMatches);
};
var part2 = function () {
    var validPasswordCount = 0;
    input.forEach(function (line) {
        if (isPasswordValid(line, positionRule)) {
            validPasswordCount++;
        }
    });
    console.log("Part 2 valid password count: " + validPasswordCount);
};
part1();
part2();
//# sourceMappingURL=solution.js.map