import { readFileSync } from 'fs';

class Instruction {
    constructor(direction: string, value: number) {
        this.direction = direction;
        this.value = value;
    }

    direction: string;
    value: number
}

const instructions: Array<Instruction> = readFileSync("day12\\input.txt", "utf-8").split("\r\n").map(x => new Instruction(x.substring(0, 1), parseInt(x.substring(1))));

// Part 1
const modulo = (x: number, N: number) => {
    return (x % N + N) % N;
}

const directions = ["N", "E", "S", "W"];

const calculateNextState = (y: number, x: number, facing: string, instruction: Instruction): [number, number, string] => {
    if (instruction.direction === "F") {
        const newPos = calculateNextState(y, x, facing, new Instruction(facing, instruction.value));
        return [newPos[0], newPos[1], facing];
    }

    if (instruction.direction === "L") {
        const newFacing = directions[modulo((directions.indexOf(facing) - instruction.value / (360 / directions.length)), directions.length)];
        return [y, x, newFacing];
    }

    if (instruction.direction === "R") {
        const newFacing = directions[(directions.indexOf(facing) + instruction.value / (360 / directions.length)) % directions.length];
        return [y, x, newFacing];
    }

    if (instruction.direction === "N") {
        return [y - instruction.value, x, facing];
    }

    if (instruction.direction === "E") {
        return [y, x + instruction.value, facing];
    }

    if (instruction.direction === "S") {
        return [y + instruction.value, x, facing];
    }

    if (instruction.direction === "W") {
        return [y, x - instruction.value, facing];
    }
}

const simulateShipMovement = (startingState: [number, number, string]): number => {
    let currentState = startingState;

    for (const instruction of instructions) {
        currentState = calculateNextState(currentState[0], currentState[1], currentState[2], instruction);
    }

    return (Math.abs(currentState[0]) + Math.abs(currentState[1]));
}

console.log("Part 1, Manhattan distance: " + simulateShipMovement([0, 0, "E"]));

const rotatePoint = (point: [number, number], angle: number): [number, number] => {
    const rad = toRadians(angle);
    return [point[0] * Math.cos(rad) + point[1] * Math.sin(rad), point[1] * Math.cos(rad) - point[0] * Math.sin(rad)];
}

const toRadians = (angle: number): number => {
    return angle * (Math.PI / 180);
}

const calculateNextStateWithWaypoint = (shipPos: [number, number], waypointRelativePos: [number, number], instruction: Instruction): [[number, number], [number, number]] => {
    if (instruction.direction === "F") {
        const y = shipPos[0] + waypointRelativePos[0] * instruction.value;
        const x = shipPos[1] + waypointRelativePos[1] * instruction.value;

        return [[y, x], waypointRelativePos];
    }

    if (instruction.direction === "L") {
        return [shipPos, rotatePoint(waypointRelativePos, -instruction.value)];
    }

    if (instruction.direction === "R") {
        return [shipPos, rotatePoint(waypointRelativePos, instruction.value)];
    }

    if (instruction.direction === "N") {
        return [shipPos, [waypointRelativePos[0] - instruction.value, waypointRelativePos[1]]];
    }

    if (instruction.direction === "E") {
        return [shipPos, [waypointRelativePos[0], waypointRelativePos[1] + instruction.value]];
    }

    if (instruction.direction === "S") {
        return [shipPos, [waypointRelativePos[0] + instruction.value, waypointRelativePos[1]]];
    }

    if (instruction.direction === "W") {
        return [shipPos, [waypointRelativePos[0], waypointRelativePos[1] - instruction.value]];
    }
}

const simulateShipMovementWithWaypoint = (shipPosAtStart: [number, number], waypointRelativePosAtStart: [number, number]): number => {
    let ship = shipPosAtStart;
    let waypoint = waypointRelativePosAtStart;

    for (const instruction of instructions) {
        const newState = calculateNextStateWithWaypoint(ship, waypoint, instruction);
        ship = newState[0];
        waypoint = newState[1];
    }

    return (Math.abs(ship[0]) + Math.abs(ship[1]));
}

console.log("Part 2, Manhattan distance: " + simulateShipMovementWithWaypoint([0, 0], [-1, 10]));