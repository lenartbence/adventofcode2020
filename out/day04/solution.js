"use strict";
var _a;
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
var passportContainsRequiredFields = function (passport) {
    if (passport.fields.length < requiredFields.length) {
        return false;
    }
    var keys = new Set(passport.fields.map(function (x) { return x.key; }));
    var i = 0;
    while (i < requiredFields.length && keys.has(requiredFields[i])) {
        i++;
    }
    return i == requiredFields.length;
};
var part1 = function () {
    var validPassportCount = passports.filter(passportContainsRequiredFields).length;
    console.log("Part 1: valid passport count: " + validPassportCount);
};
var validateYear = function (input, atLeast, atMost) {
    var inputAsNumber = parseInt(input);
    return input.length == 4 && inputAsNumber >= atLeast && inputAsNumber <= atMost;
};
var validateBirthYear = function (input) { return validateYear(input, 1920, 2002); };
var validateIssueYear = function (input) { return validateYear(input, 2010, 2020); };
var validateExpirationYear = function (input) { return validateYear(input, 2020, 2030); };
var validateHeight = function (input) {
    var data = input.match(/^([0-9]*)(in|cm)$/);
    if (!data) {
        return false;
    }
    var height = parseInt(data[1]);
    return data[2] === "cm" ? (height >= 150 && height <= 193) : (height >= 59 && height <= 76);
};
var validateHexColor = function (input) {
    return input.match(/^#[0-9A-Fa-f]{6}$/) != null;
};
var validateEyeColor = function (input) {
    var possibleColors = new Set("amb blu brn gry grn hzl oth".split(" "));
    return possibleColors.has(input);
};
var validatePassportId = function (input) {
    return input.match(/^[0-9]{9}$/) != null;
};
var fieldRequirements = (_a = {},
    _a["byr"] = validateBirthYear,
    _a["iyr"] = validateIssueYear,
    _a["eyr"] = validateExpirationYear,
    _a["hgt"] = validateHeight,
    _a["hcl"] = validateHexColor,
    _a["ecl"] = validateEyeColor,
    _a["pid"] = validatePassportId,
    _a["cid"] = function () { return true; },
    _a);
var part2 = function () {
    var validPassports = passports
        .filter(passportContainsRequiredFields)
        .filter(function (pass) { return pass.fields.filter(function (field) { return fieldRequirements[field.key](field.value); }).length == pass.fields.length; });
    console.log("Part 2: valid passport count: " + validPassports.length);
};
part1();
part2();
//# sourceMappingURL=solution.js.map