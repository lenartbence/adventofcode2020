"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var passports = fs_1.readFileSync("day04\\input.txt", "utf-8")
    .split("\r\n\r\n")
    .map(function (x) { return x.replace(/\r\n/g, " "); })
    .map(function (passportString) { return passportString.split(" ")
    .map(function (fieldString) {
    var data = fieldString.split(":");
    var field = { key: data[0], value: data[1] };
    return field;
}); })
    .map(function (x) {
    var passport = { fields: x };
    return passport;
});
var requiredFields = "byr iyr eyr hgt hcl ecl pid".split(" ");
var isPassportValid = function (passport) {
    // if (passport.fields.length < requiredFields.length) {
    //     return false;
    // }
    var keys = new Set(passport.fields.map(function (x) { return x.key; }));
    var i = 0;
    while (i < requiredFields.length && keys.has(requiredFields[i])) {
        i++;
    }
    return i == requiredFields.length;
};
var part1 = function () {
    var validPassportCount = passports.map(function (x) { return isPassportValid(x); }).filter(function (x) { return true; }).length;
    console.log("Part 1: valid passport count: " + validPassportCount);
};
part1();
//# sourceMappingURL=solution.js.map