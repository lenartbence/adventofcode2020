import { readFileSync } from 'fs';

const preambleLength = 25;
const numbers: Array<number> = readFileSync("day09\\input.txt", "utf-8").split("\r\n").map(x => parseInt(x));

const findInvalidNumber = (): number => {
    for (let i = preambleLength; i < numbers.length; i++) {
        let isValid = false;
        for (let j = i - preambleLength - 1; j < i; j++) {
            if (isValid) {
                break;
            }

            for (let k = i - preambleLength - 1; k < i; k++) {
                if (j != k && numbers[i] === numbers[j] + numbers[k]) {
                    isValid = true;
                    break;
                }
            }
        }

        if (!isValid) {
            return numbers[i];
        }
    }

    return null;
}

const findWeakness = (targetNumber: number): number => {
    for (let setSize = 2; setSize < numbers.length / 2; setSize++) {
        for (const [i, a] of numbers.entries()) {
            if (a >= targetNumber) {
                continue;
            }
            let sum = 0;
            let min = a;
            let max = a;
            for (let j = i; j < i + setSize; j++) {
                sum += numbers[j];

                if (numbers[j] < min) {
                    min = numbers[j];
                }

                if (numbers[j] > max) {
                    max = numbers[j];
                }
            }

            if (sum === targetNumber) {
                return min + max;
            }
        }
    }
}

const invalidNumber = findInvalidNumber();
const weakness = findWeakness(invalidNumber);

console.log("Part 1, the invalid number is " + invalidNumber);
console.log("Part 2, the encryption weakness is " + weakness);