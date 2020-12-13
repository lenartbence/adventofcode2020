import { readFileSync } from 'fs';

class Instruction {
    constructor(direction: string, value: number) {
        this.direction = direction;
        this.value = value;
    }

    direction: string;
    value: number
}

const modulo = (x: number, N: number) => {
    return (x % N + N) % N;
}

const directions = ["N", "E", "S", "W"];
const instructions: Array<Instruction> = readFileSync("day12\\input.txt", "utf-8").split("\r\n").map(x => new Instruction(x.substring(0, 1), parseInt(x.substring(1))));

const calculateNextState = (y: number, x: number, facing: string, direction: string, amount: number): [number, number, string] => {
    if (direction === "F") {
        const newPos = calculateNextState(y, x, facing, facing, amount);
        return [newPos[0], newPos[1], facing];
    }

    if (direction === "L") {
        const newFacing = directions[modulo((directions.indexOf(facing) - amount / (360 / directions.length)), directions.length)];
        return [y, x, newFacing];
    }

    if (direction === "R") {
        const newFacing = directions[(directions.indexOf(facing) + amount / (360 / directions.length)) % directions.length];
        return [y, x, newFacing];
    }

    if (direction === "N") {
        return [y - amount, x, facing];
    }

    if (direction === "E") {
        return [y, x + amount, facing];
    }

    if (direction === "S") {
        return [y + amount, x, facing];
    }

    if (direction === "W") {
        return [y, x - amount, facing];
    }
}

let currentState: [number, number, string] = [0, 0, "E"];

for (const instruction of instructions) {
    currentState = calculateNextState(currentState[0], currentState[1], currentState[2], instruction.direction, instruction.value);
}

console.log("Part 1, Manhattan distance: " + (Math.abs(currentState[0]) + Math.abs(currentState[1])));