import { readFileSync } from 'fs';

class Rule {
    constructor(name: string, validValueRanges: Array<[number, number]>) {
        this.name = name;
        this.validValueRanges = validValueRanges;
    }

    name: string;
    validValueRanges: Array<[number, number]>;
}

const rules = new Array<Rule>();
let nearbyTickets = new Array<Array<number>>();
let myTicket: Array<number>;

const processInput = () => {
    const input = readFileSync("day16\\input.txt", "utf-8").split("\r\n\r\n");

    for (const line of input[0].split("\r\n")) {
        const match = line.match(/([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/);
        if (match) {
            rules.push(new Rule(match[1], [
                [parseInt(match[2]), parseInt(match[3])],
                [parseInt(match[4]), parseInt(match[5])]
            ]));
        }
    }

    myTicket = input[1].split("\r\n")[1].split(",").map(x => parseInt(x));

    const nearbyTicketInput = input[2].split("\r\n");
    for (let i = 1; i < nearbyTicketInput.length; i++) {
        nearbyTickets.push(nearbyTicketInput[i].split(",").map(x => parseInt(x)));
    }
}

const removeInvalidTickets = () => {
    const invalidFields = new Array<number>();
    const validTickets = Array<Array<number>>();

    for (const ticket of nearbyTickets) {
        const newTicket = Array<number>();
        let isTicketValid = true;

        for (const field of ticket) {
            if (isFieldValidForAnyRule(field)) {
                newTicket.push(field);
            }
            else {
                invalidFields.push(field);
                isTicketValid = false;
            }
        }

        if (isTicketValid) {
            validTickets.push(newTicket);
        }
    }

    nearbyTickets = validTickets;
    return invalidFields;
}

const isFieldValidForAnyRule = (field: number) => {
    let valid = false;
    for (const rule of rules) {
        if (isFieldValid(field, rule)) {
            valid = true;
            break;
        }
    }

    return valid;
}

const isFieldValid = (field: number, rule: Rule) => {
    let valid = false;
    for (const range of rule.validValueRanges) {
        if (field >= range[0] && field <= range[1]) {
            valid = true;
            break;
        }
    }
    return valid;
}

const pairRulesWithPositions = (): Map<Rule, number> => {
    const possiblePositions = getPossiblePositionsForEachRule();
    const map = new Map([...possiblePositions.entries()].sort((a, b) => a[1].size - b[1].size))

    const result = new Map<Rule, number>();
    const alreadyPairedPositions = new Set<number>();

    for (const entry of map.entries()) {
        const remainingItem: number = [...entry[1]].filter(x => !alreadyPairedPositions.has(x))[0];
        alreadyPairedPositions.add(remainingItem);
        result.set(entry[0], remainingItem);
    }

    return result;
}

const getPossiblePositionsForEachRule = () => {
    const map = new Map<Rule, Set<number>>();

    for (const rule of rules) {
        for (let i = 0; i < myTicket.length; i++) {
            let positionIsValidForThisRule = true;
            for (const ticket of nearbyTickets) {
                if (!isFieldValid(ticket[i], rule)) {
                    positionIsValidForThisRule = false;
                    break;
                }
            }

            if (positionIsValidForThisRule) {
                const entry = map.get(rule);
                if (entry) {
                    entry.add(i);
                    map.set(rule, entry);
                }
                else {
                    map.set(rule, new Set<number>([i]));
                }
            }
        }
    }

    return map;
}

const calculateSum = (numbers: Array<number>) => {
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    return sum;
}

processInput();
const invalidFields = removeInvalidTickets();
const ticketScanningErrorRate = calculateSum(invalidFields);

console.log("Part 1, ticket scanning error rate: " + ticketScanningErrorRate);

const rulePositionMap = pairRulesWithPositions();

let result = 1;
for (const entry of rulePositionMap.entries()) {
    if (entry[0].name.startsWith("departure")) {
        result *= myTicket[entry[1]];
    }
}

console.log("Part 2, departure field values multiplied together: " + result);
