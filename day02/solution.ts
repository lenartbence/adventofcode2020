import * as fs from 'fs';

const input = fs.readFileSync("day02/input.txt", "utf-8").split("\r\n");

const getTargetCharacter = (text: string): string => {
    return text.match(/.(?=:)/)[0];
}

const getMinOccurence = (text: string): number => {
    return parseInt(text.match(/^.*(?=-)/)[0], 10);
}

const getMaxOccurence = (text: string): number => {
    return parseInt(text.match(/(?<=-).*?(?= )/)[0], 10);
}

const getPassword = (text: string): string => {
    return text.match(/(?<=: ).*$/)[0];
}

const isPasswordValid = (policyAndPassword: string): boolean => {
    const password = getPassword(policyAndPassword);
    const character = getTargetCharacter(policyAndPassword);
    const min = getMinOccurence(policyAndPassword);
    const max = getMaxOccurence(policyAndPassword);

    const pattern = `${character}`
    const regexp = new RegExp(pattern, "g");
    const count = (password.match(regexp) || []).length;

    return count >= min && count <= max;
}

let validPasswordCount = 0;

input.forEach(line => {
    if (isPasswordValid(line)) {
        validPasswordCount++;
    }
});

console.log(`Valid password count: ${validPasswordCount}`);