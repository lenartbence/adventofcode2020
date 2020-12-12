import { readFileSync } from 'fs';

const treshold = 3;
const input = readFileSync("day10\\input.txt", "utf-8").split("\r\n").map(x => parseInt(x)).sort((a, b) => a - b);

const countDifferences = (adapters: Array<number>): Map<number, number> => {
    let result = new Map<number, number>();
    let previousAdapter = 0;
    for (const adapter of adapters) {
        const diff = adapter - previousAdapter;
        const storedDiff = result.get(diff);

        result.set(diff, storedDiff ? storedDiff + 1 : 1);

        previousAdapter = adapter;
    }

    result.set(treshold, result.get(treshold) + 1);
    return result;
}

// const mapPossiblePaths = (adapters: Array<number>): Map<number, Array<number>> => {
//     const adaptersCopy = adapters.map(x => x);
//     adaptersCopy.splice(0, 0, 0);
//     adaptersCopy.push(adapters[adapters.length - 1] + treshold);

//     const result = new Map<number, Array<number>>();
//     for (const [i, adapter] of adaptersCopy.entries()) {
//         const directions = new Array<number>();

//         for (let j = i + 1; j < i + 1 + treshold && j < adaptersCopy.length; j++) {
//             if (adaptersCopy[j] <= adapter + treshold) {
//                 directions.push(adaptersCopy[j]);
//             }
//         }

//         result.set(adapter, directions);
//     }

//     return result;
// }

const countAllPossiblePaths = (adapters: Array<number>): number => {
    const adaptersCopy = adapters.map(x => x);
    adaptersCopy.splice(0, 0, 0);
    adaptersCopy.push(adapters[adapters.length - 1] + treshold);

    const counters = new Map<number, number>();

    for (let i = 0; i < adaptersCopy.length; i++) {
        if (i < treshold - 1) {
            counters.set(adaptersCopy[i], 1);
        }
        else {
            let possibilitesToThisAdapter = 0;
            for (let j = i - treshold; j < i; j++) {
                if (j >= 0) {
                    if (adaptersCopy[i] <= adaptersCopy[j] + treshold)
                        possibilitesToThisAdapter += counters.get(adaptersCopy[j]) ?? 0;
                }
            }

            counters.set(adaptersCopy[i], possibilitesToThisAdapter);
        }
    }

    return counters.get(adaptersCopy[adaptersCopy.length - 1]);
}

const differences = countDifferences(input);
console.log(`Part 1: ${differences.get(1) * differences.get(3)}`);

// const possiblePaths = mapPossiblePaths(input);
console.log(`Part 2: ${countAllPossiblePaths(input)}`);