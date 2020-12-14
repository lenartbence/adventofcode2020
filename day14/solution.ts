import { readFileSync } from 'fs';

const input = readFileSync("day14\\input.txt", "utf-8").split("\r\n");

const sum = (numbers: Array<number>): number => {
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }

    return sum;
}

const executeVersion1 = (input: Array<string>): Map<string, number> => {
    const output = new Map<string, number>();

    let mask: string;
    let maskToOne: bigint;
    let maskToZero: bigint;
    for (const line of input) {
        const maskMatch = line.match(/mask = ([X|1|0]*)/);
        if (maskMatch) {
            mask = maskMatch[1];

            // OR-ing this will ignore the Xs in the mask
            maskToOne = BigInt("0b" + mask.replace(/X/g, "0"));

            // AND-ing this will ignore the Xs in the mask
            maskToZero = BigInt("0b" + mask.replace(/X/g, "1"));
        }
        else {
            const memMatch = line.match(/mem\[([0-9]*)\] = ([0-9]*)/);
            const memoryAddress: string = memMatch[1];
            const value: bigint = BigInt(memMatch[2]);
            const maskApplied = (value | maskToOne) & maskToZero;

            output.set(memoryAddress, Number(maskApplied));
        }
    }

    return output;
}

const executeVersion2 = (input: Array<string>): Map<bigint, number> => {
    const output = new Map<bigint, number>();

    let mask: string;
    let maskToOne: bigint;
    for (const line of input) {
        const maskMatch = line.match(/mask = ([X|1|0]*)/);
        if (maskMatch) {
            mask = maskMatch[1];
            // OR-ing this will keep 0s the same, and set 1s to 1 in the result. Changing X to 0 is for ignoring these bits for now.
            maskToOne = BigInt("0b" + mask.replace(/X/g, "0"));
        }
        else {
            const memMatch = line.match(/mem\[([0-9]*)\] = ([0-9]*)/);
            const memoryAddress: bigint = BigInt(memMatch[1]) | maskToOne;

            let xCount = 0;
            for (const char of mask) {
                if (char === "X") {
                    xCount++;
                }
            }

            // Incrementing a number and using it in binary form will produce all combinations of the possible bits that can fill for Xs.
            const limitForGeneratingBits: number = (1 << xCount) - 1;
            for (let numberForReplacementBits = 0; numberForReplacementBits <= limitForGeneratingBits; numberForReplacementBits++) {

                // This will store the current combination of bits (not in the correct place yet, just a simple "list" of them).
                let bits: string = numberForReplacementBits.toString(2);
                while (bits.length < xCount) {
                    bits = "0" + bits;
                }

                let memoryAddressString = memoryAddress.toString(2);
                while (memoryAddressString.length < mask.length) {
                    memoryAddressString = "0" + memoryAddressString;
                }

                // Looking for Xs in the mask and changing the bits in the string representation of the memory address.
                // This is where the bits from above get to the correct place.
                let indexOfBitToFill = 0;
                for (let i = 0; i < mask.length; i++) {
                    if (mask[i] === "X") {
                        memoryAddressString = `${memoryAddressString.substring(0, i)}${bits[indexOfBitToFill]}${memoryAddressString.substring(i + 1)}`;
                        indexOfBitToFill++;
                    }
                }

                const value: number = parseInt(memMatch[2]);
                output.set(BigInt("0b" + memoryAddressString), value);
            }
        }
    }

    return output;
}

const memoryAfterVersion1 = executeVersion1(input);
console.log(sum(Array.from(memoryAfterVersion1.values())));

const memoryAfterVersion2 = executeVersion2(input);
console.log(sum(Array.from(memoryAfterVersion2.values())));