import { readFileSync } from 'fs';

const originalLayout = readFileSync("day11\\input.txt", "utf-8").split("\r\n").map(x => [...x]);

interface IRule {
    canApply: (character: string) => boolean;
    apply: (row: number, column: number, currentState: string[][], seatDistanceLimit: number) => string
}

abstract class TakenSeatRule implements IRule {
    abstract canApply: (character: string) => boolean;
    abstract takenSeatCountCondition: (takenAdjacentSeats: number) => boolean;
    abstract characterToChangeTo: string;

    apply = (row: number, column: number, currentState: string[][], seatDistanceLimit: number): string => {
        let takenSeats = countVisibleOccupiedSeats(row, column, currentState, seatDistanceLimit);
        if (this.takenSeatCountCondition(takenSeats)) {
            return this.characterToChangeTo;
        }

        return currentState[row][column];
    }
}

class FillRule extends TakenSeatRule {
    canApply = (character: string) => character === "L";
    takenSeatCountCondition = (relevantTakenSeats: number) => relevantTakenSeats === 0;
    characterToChangeTo = "#";
}

class EmptyRule extends TakenSeatRule {
    constructor(takenSeatLimit: number) {
        super();
        this.takenSeatLimit = takenSeatLimit;
    }

    private takenSeatLimit: number;

    canApply = (character: string) => character === "#";
    takenSeatCountCondition = (relevantTakenSeats: number) => relevantTakenSeats >= this.takenSeatLimit;
    characterToChangeTo = "L";
}

const countVisibleOccupiedSeats = (row: number, column: number, layout: string[][], range: number): number => {
    let count = 0;
    const directionMap: Array<[number, number, boolean]> = [
        [-1, -1, false],
        [0, -1, false],
        [1, -1, false],
        [-1, 0, false],
        [1, 0, false],
        [-1, 1, false],
        [0, 1, false],
        [1, 1, false],
    ];
    let calculatedDirectionCounter = 0;

    const markDirectionAsFinished = (index: number) => {
        directionMap[index][2] = true;
        calculatedDirectionCounter++;
    }

    for (let distance = 1; distance <= range; distance++) {
        if (calculatedDirectionCounter === directionMap.length) {
            break;
        }

        for (const [i, direction] of directionMap.entries()) {
            if (direction[2]) {
                continue;
            }

            const y = row + (direction[0] * distance);
            const x = column + (direction[1] * distance);

            if (y < 0 || y >= layout.length) {
                markDirectionAsFinished(i);
                continue;
            }
            if (x < 0 || x >= layout[0].length) {
                markDirectionAsFinished(i);
                continue;
            }

            if (layout[y][x] === "L") {
                markDirectionAsFinished(i);
                continue;
            }

            if (layout[y][x] === "#") {
                markDirectionAsFinished(i);
                count++;
            }
        }
    }

    return count;
}

const applyRules = (currentState: string[][], rules: Array<IRule>, seatDistanceLimit: number): [string[][], number] => {
    const nextState = currentState.map(x => x.map(c => `${c}`));
    let modifiedSeatCount = 0;

    for (let i = 0; i < currentState.length; i++) {
        for (let j = 0; j < currentState[i].length; j++) {
            for (const rule of rules) {
                if (rule.canApply(currentState[i][j])) {
                    const result = rule.apply(i, j, currentState, seatDistanceLimit);
                    if (currentState[i][j] != result) {
                        nextState[i][j] = result;
                        modifiedSeatCount++;
                    }
                }
            }
        }
    }

    return [nextState, modifiedSeatCount];
}

const simulate = (layout: string[][], rules: Array<IRule>, seatDistanceLimit: number): string[][] => {
    let currentState = layout;
    let modifiedSeatCount: number;

    do {
        const result = applyRules(currentState, rules, seatDistanceLimit);
        currentState = result[0];
        modifiedSeatCount = result[1];
    }
    while (modifiedSeatCount != 0);

    return currentState;
}

const countOccupiedSeats = (layout: string[][]): number => {
    let count = 0;

    for (const [i, row] of layout.entries()) {
        for (const [j, column] of row.entries()) {
            if (layout[i][j] === "#") {
                count++;
            }
        }
    }

    return count;
}

// Part 1
const rules: Array<IRule> = [
    new FillRule(),
    new EmptyRule(4)
];

const newState = simulate(originalLayout, rules, 1);
console.log("Part 1, occupied seats: " + countOccupiedSeats(newState));

// Part 2
const rules2: Array<IRule> = [
    new FillRule(),
    new EmptyRule(5)
];

const layoutSize = Math.min(...[originalLayout.length, originalLayout[0].length]);
const newState2 = simulate(originalLayout, rules2, layoutSize - 1);

console.log("Part 2, occupied seats: " + countOccupiedSeats(newState2));