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

// the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus:
console.log("Part 1: " + buses[indexOfMyBus] * waitTimes[indexOfMyBus]);