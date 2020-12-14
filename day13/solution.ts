import { readFileSync } from 'fs';

const input = readFileSync("day13\\input.txt", "utf-8").split("\r\n");

const myTimestamp = parseInt(input[0]);
const buses = input[1].split(",").filter(x => x != "x").map(x => parseInt(x));

const waitTimes = new Array<number>();
for (const bus of buses) {
    const waitTime = bus - (myTimestamp % bus);
    waitTimes.push(waitTime);
}

const indexOfSmallest = (array: Array<number>) => {
    var lowest = 0;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[lowest]) {
            lowest = i;
        }
    }
    return lowest;
}

const indexOfMyBus = indexOfSmallest(waitTimes);

console.log("Part 1: " + buses[indexOfMyBus] * waitTimes[indexOfMyBus]);

// Part 2

const greatestCommonDivisor = (a: number, b: number) => {
    while (b != 0) {
        const t = b;
        b = a % b;
        a = t;
    }

    return a
}

const lowestCommonMultiple = (a: number, b: number) => {
    if (a > b)
        return (a / greatestCommonDivisor(a, b)) * b;
    else
        return (b / greatestCommonDivisor(a, b)) * a;
}

const lowestCommonMultipleArray = (array: Array<number>) => {
    return array.reduce(lowestCommonMultiple, 1);
}

const getDepartOffsets = (scheduleEntries: Array<string>) => {
    const result = new Map<number, number>();
    for (const [i, entry] of scheduleEntries.entries()) {
        if (entry != "x") {
            result.set(parseInt(entry), i);
        }
    }
    return result;
}

const departOffsets = getDepartOffsets(input[1].split(","));

const doBusesAlign = (timestamp: number, busesToCheck: Array<number>) => {
    for (const b of busesToCheck) {
        if ((timestamp + departOffsets.get(b)) % b != 0) {
            return false;
        }
    }
    return true;
}

let jump = 1;
let timestamp = buses[0];

for (let numberOfBusesToCheck = 2; numberOfBusesToCheck <= buses.length; numberOfBusesToCheck++) {
    while (!doBusesAlign(timestamp, buses.slice(0, numberOfBusesToCheck))) {
        timestamp += jump;
    }

    jump = lowestCommonMultipleArray(buses.slice(0, numberOfBusesToCheck));
}

console.log("Part 2: " + timestamp);