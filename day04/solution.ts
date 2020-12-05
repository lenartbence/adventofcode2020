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

const isPassportValid = (passport: Passport): boolean => {
    // if (passport.fields.length < requiredFields.length) {
    //     return false;
    // }

    const keys = new Set<string>(passport.fields.map(x => x.key));
    let i = 0;
    while (i < requiredFields.length && keys.has(requiredFields[i])) {
        i++;
    }

    return i == requiredFields.length;
}

const part1 = () => {
    const validPassportCount = passports.map(x => isPassportValid(x)).filter(x => x).length;
    console.log(`Part 1: valid passport count: ${validPassportCount}`);
}

part1();