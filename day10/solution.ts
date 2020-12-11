import { readFileSync } from 'fs';

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

    result.set(3, result.get(3) + 1);
    return result;
}

const differences = countDifferences(input);

console.log(`Part 1: ${differences.get(1) * differences.get(3)}`);