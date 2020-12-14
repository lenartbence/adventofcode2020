import { readFileSync } from 'fs';

const input = readFileSync("day14\\input.txt", "utf-8").split("\r\n");

const memory = new Map<string, number>();

let mask: string;
let maskToOne: bigint;
let maskToZero: bigint;
for (const line of input) {
    const maskMatch = line.match(/mask = ([X|1|0]*)/);
    if (maskMatch) {
        mask = maskMatch[1];
        maskToOne = BigInt(parseInt(mask.replace(/X/g, "0"), 2));
        maskToZero = BigInt(parseInt(mask.replace(/X/g, "1"), 2));
    }
    else {
        const memMatch = line.match(/mem\[([0-9]*)\] = ([0-9]*)/);
        const memoryAddress: string = memMatch[1];
        const value: bigint = BigInt(memMatch[2]);
        const maskApplied = (value | maskToOne) & maskToZero;
        // Masking sets higher bits to 1, this is a fix for that
        const fixed = maskApplied & (BigInt(1) << BigInt(mask.length)) - BigInt(1);
        memory.set(memoryAddress, Number(fixed));
    }
}

let sum = 0;
for (const mem of memory) {
    sum += mem[1];
}

console.log(sum);