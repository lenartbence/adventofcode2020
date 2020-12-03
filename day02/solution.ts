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

const isPasswordValid = (policyAndPassword: string, rule: (password: string, firstNumber: number, secondNumber: number, character: string) => boolean): boolean => {
    const password = getPassword(policyAndPassword);
    const character = getTargetCharacter(policyAndPassword);
    const firstNumber = getMinOccurence(policyAndPassword);
    const secondNumber = getMaxOccurence(policyAndPassword);

    return rule(password, firstNumber, secondNumber, character);
}

const minMaxRule = (password: string, firstNumber: number, secondNumber: number, character: string) => {
    const pattern = `${character}`
    const regexp = new RegExp(pattern, "g");
    const count = (password.match(regexp) || []).length;

    return count >= firstNumber && count <= secondNumber;
}

const part1 = () => {
    let validPasswordCount = 0;

    input.forEach(line => {
        if (isPasswordValid(line, minMaxRule)) {
            validPasswordCount++;
        }
    });

    console.log(`Part 1 valid password count: ${validPasswordCount}`);
}

const positionRule = (password: string, firstNumber: number, secondNumber: number, character: string) => {
    const firstCharMatches = password[firstNumber-1] == character;
    const secondCharMatches = password[secondNumber-1] == character;

    return (firstCharMatches && !secondCharMatches) || (!firstCharMatches && secondCharMatches);
}

const part2 = () => {
    let validPasswordCount = 0;

    input.forEach(line => {
        if (isPasswordValid(line, positionRule)) {
            validPasswordCount++;
        }
    });

    console.log(`Part 2 valid password count: ${validPasswordCount}`);
}

part1();
part2();