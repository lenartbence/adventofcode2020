"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var Bag = /** @class */ (function () {
    function Bag(colorCode, contains, containedBy) {
        this.colorCode = colorCode;
        this.contains = contains;
        this.containedBy = containedBy;
    }
    return Bag;
}());
var initializeBags = function (rules) {
    var bags = new Map();
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        var ruleParts = rule.split("contain");
        var currentBagColorCode = ruleParts[0].replace("bags", "").trim();
        var bag = getBagByColorCode(currentBagColorCode, bags);
        var containedBags = parseRuleSection(ruleParts[1], bags);
        if (containedBags.length > 0) {
            bag.contains = containedBags;
            for (var _a = 0, containedBags_1 = containedBags; _a < containedBags_1.length; _a++) {
                var _b = containedBags_1[_a], b = _b[1];
                b.containedBy.push(bag);
            }
        }
    }
    return bags;
};
var getBagByColorCode = function (colorCode, bagCollection) {
    var bag = bagCollection.get(colorCode);
    if (!bag) {
        bag = new Bag(colorCode, new Array(), new Array());
        bagCollection.set(colorCode, bag);
    }
    return bag;
};
var parseRuleSection = function (ruleSection, bagCollection) {
    var result = new Array();
    if (ruleSection.trim() != "no other bags.") {
        var elements = ruleSection.replace("bags.", "").replace("bag", "").split(",").map(function (x) { return x.trim(); });
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var elementParts = element.split(" ");
            var color = elementParts[1] + " " + elementParts[2];
            result.push([parseInt(elementParts[0]), getBagByColorCode(color, bagCollection)]);
        }
    }
    return result;
};
var getPossibleContainersOfBag = function (bag, visitedBags) {
    for (var _i = 0, _a = bag.containedBy; _i < _a.length; _i++) {
        var container = _a[_i];
        visitedBags = getPossibleContainersOfBag(container, visitedBags.add(container));
    }
    return visitedBags;
};
var allContainedBagCount = 0;
var countAllContainedBags = function (bag, parentCount) {
    for (var _i = 0, _a = bag.contains; _i < _a.length; _i++) {
        var _b = _a[_i], amount = _b[0], child = _b[1];
        allContainedBagCount += amount * parentCount;
        countAllContainedBags(child, amount * parentCount);
    }
};
var rules = fs_1.readFileSync("day07\\input.txt", "utf-8").split('\r\n');
var bags = initializeBags(rules);
var targetColor = "shiny gold";
var possibleContainers = getPossibleContainersOfBag(getBagByColorCode(targetColor, bags), new Set());
countAllContainedBags(getBagByColorCode(targetColor, bags), 1);
console.log("Part 1, number of possible containers of a " + targetColor + " bag: " + possibleContainers.size);
console.log("Part 2, number of all other contained bags of a " + targetColor + " bag: " + allContainedBagCount);
//# sourceMappingURL=solution.js.map