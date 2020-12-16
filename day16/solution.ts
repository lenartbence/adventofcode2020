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
const nearbyTickets = new Array<Array<number>>();
let myTicket: Array<number>;

const processInput = () => {
    const input = readFileSync("day16\\input.txt", "utf-8").split("\r\n\r\n");

    for (const line of input[0].split("\r\n")) {
        const match = line.match(/([a-z]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/);
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

const getInvalidFields = () => {
    const result = new Array<number>();

    for (const ticket of nearbyTickets) {
        for (const field of ticket) {
            let valid = false;
            for (const rule of rules) {
                for (const range of rule.validValueRanges) {
                    if (field >= range[0] && field <= range[1]) {
                        valid = true;
                        break;
                    }
                }

                if (valid) {
                    break;
                }
            }

            if (!valid) {
                result.push(field);
            }
        }
    }

    return result;
}

const calculateSum = (numbers: Array<number>) => {
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    return sum;
}

processInput();
const ticketScanningErrorRate = calculateSum(getInvalidFields());

console.log("Part 1, ticket scanning error rate: " + ticketScanningErrorRate);