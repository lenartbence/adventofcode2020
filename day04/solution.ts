import { readFileSync } from 'fs';

interface Field {
    key: string,
    value: string
}

interface Passport {
    fields: Field[]
}

const passports = readFileSync("day04\\input.txt", "utf-8")
    .split("\r\n\r\n")
    .map(x => x.replace(/\r\n/g, " "))
    .map(passportString => passportString.split(" ")
        .map(fieldString => {
            const data = fieldString.split(":");
            const field: Field = { key: data[0], value: data[1] };
            return field;
        }))
    .map(x => {
        const passport: Passport = { fields: x }
        return passport;
    });

const requiredFields: string[] = "byr iyr eyr hgt hcl ecl pid".split(" ");

const passportContainsRequiredFields = (passport: Passport): boolean => {
    if (passport.fields.length < requiredFields.length) {
        return false;
    }

    const keys = new Set<string>(passport.fields.map(x => x.key));
    let i = 0;
    while (i < requiredFields.length && keys.has(requiredFields[i])) {
        i++;
    }

    return i == requiredFields.length;
}

const part1 = () => {
    const validPassportCount = passports.filter(passportContainsRequiredFields).length;
    console.log(`Part 1: valid passport count: ${validPassportCount}`);
}

const validateYear = (input: string, atLeast: number, atMost: number): boolean => {
    const inputAsNumber: number = parseInt(input);
    return input.length == 4 && inputAsNumber >= atLeast && inputAsNumber <= atMost;
}

const validateBirthYear = (input: string) => validateYear(input, 1920, 2002);

const validateIssueYear = (input: string) => validateYear(input, 2010, 2020);

const validateExpirationYear = (input: string) => validateYear(input, 2020, 2030);

const validateHeight = (input: string): boolean => {
    const data = input.match(/([0-9]*)(in|cm)/);
    if (!data) {
        return false;
    }

    const height = parseInt(data[1]);
    return data[2] === "cm" ? (height >= 150 && height <= 193) : (height >= 59 && height <= 76);
}

const validateHexColor = (input: string): boolean => {
    return input.match(/#[0-9A-Fa-f]{6}/) != null;
}

const validateEyeColor = (input: string): boolean => {
    const possibleColors = new Set<string>("amb blu brn gry grn hzl oth".split(" "));
    return possibleColors.has(input);
}

const validatePassportId = (input: string): boolean => {
    return input.match(/^[0-9]{9}$/) != null;
}

const fieldRequirements: { [key: string]: (input: string) => boolean } = {
    ["byr"]: validateBirthYear,
    ["iyr"]: validateIssueYear,
    ["eyr"]: validateExpirationYear,
    ["hgt"]: validateHeight,
    ["hcl"]: validateHexColor,
    ["ecl"]: validateEyeColor,
    ["pid"]: validatePassportId,
    ["cid"]: () => true,
}

const part2 = () => {
    const validPassports = passports
        .filter(passportContainsRequiredFields)
        .filter(pass => pass.fields.filter(field => fieldRequirements[field.key](field.value)).length == pass.fields.length);

        console.log(`Part 2: valid passport count: ${validPassports.length}`);
}

part1();
part2();