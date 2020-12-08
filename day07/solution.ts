import { readFileSync } from 'fs';

class Bag {
    colorCode: string;
    contains: Array<[amount: number, type: Bag]>;
    containedBy: Array<Bag>;

    constructor(colorCode: string, contains: Array<[number, Bag]>, containedBy: Array<Bag>) {
        this.colorCode = colorCode;
        this.contains = contains;
        this.containedBy = containedBy;
    }
}

const initializeBags = (rules: string[]): Map<string, Bag> => {
    const bags = new Map<string, Bag>();

    for (const rule of rules) {
        const ruleParts = rule.split("contain");
        const currentBagColorCode = ruleParts[0].replace("bags", "").trim();

        const bag = getBagByColorCode(currentBagColorCode, bags);
        const containedBags = parseRuleSection(ruleParts[1], bags);

        if (containedBags.length > 0) {
            bag.contains = containedBags;
            for (let [, b] of containedBags) {
                b.containedBy.push(bag);
            }
        }
    }

    return bags;
}

const getBagByColorCode = (colorCode: string, bagCollection: Map<string, Bag>): Bag => {
    let bag = bagCollection.get(colorCode);
    if (!bag) {
        bag = new Bag(colorCode, new Array<[number, Bag]>(), new Array<Bag>());
        bagCollection.set(colorCode, bag);
    }

    return bag;
}

const parseRuleSection = (ruleSection: string, bagCollection: Map<string, Bag>): Array<[number, Bag]> => {
    const result = new Array<[number, Bag]>();

    if (ruleSection.trim() != "no other bags.") {
        const elements = ruleSection.replace("bags.", "").replace("bag", "").split(",").map(x => x.trim());

        for (let element of elements) {
            const elementParts = element.split(" ");
            const color = elementParts[1] + " " + elementParts[2];
            result.push([parseInt(elementParts[0]), getBagByColorCode(color, bagCollection)]);
        }
    }

    return result;
}

const getPossibleContainersOfBag = (bag: Bag, visitedBags: Set<Bag>): Set<Bag> => {
    for (let container of bag.containedBy) {
        visitedBags = getPossibleContainersOfBag(container, visitedBags.add(container));
    }

    return visitedBags;
}

let allContainedBagCount = 0;
const countAllContainedBags = (bag: Bag, parentCount: number) => {
    for (const [amount, child] of bag.contains) {
        allContainedBagCount += amount * parentCount;
        countAllContainedBags(child, amount * parentCount);
    }
};

const rules = readFileSync("day07\\input.txt", "utf-8").split('\r\n');
const bags = initializeBags(rules);
const targetColor = "shiny gold";
const possibleContainers = getPossibleContainersOfBag(getBagByColorCode(targetColor, bags), new Set<Bag>());
countAllContainedBags(getBagByColorCode(targetColor, bags), 1);

console.log("Part 1, number of possible containers of a " + targetColor + " bag: " + possibleContainers.size);
console.log("Part 2, number of all other contained bags of a " + targetColor + " bag: " + allContainedBagCount);