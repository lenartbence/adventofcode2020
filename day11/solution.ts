import { readFileSync } from 'fs';

let layout = readFileSync("day11\\input.txt", "utf-8").split("\r\n").map(x => [...x]);

interface IRule {
    canApply: (character: string) => boolean;
    apply: (row: number, column: number, currentState: string[][]) => string
}

abstract class TakenAdjacentSeatRule implements IRule {
    abstract canApply: (character: string) => boolean;
    abstract adjacentSeatCountCondition: (takenAdjacentSeats: number) => boolean;
    abstract characterToChangeTo: string;

    apply = (row: number, column: number, currentState: string[][]): string => {
        let takenAdjacentSeats = 0;
        const adjacentPlaces = getAdjacentPlaces(row, column, currentState);
        for (const adjacent of adjacentPlaces) {
            if (currentState[adjacent[0]][adjacent[1]] === "#") {
                takenAdjacentSeats++;
            }
        }

        if (this.adjacentSeatCountCondition(takenAdjacentSeats)) {
            return this.characterToChangeTo;
        }

        return currentState[row][column];
    }
}

class FillRule extends TakenAdjacentSeatRule {
    canApply = (character: string) => character === "L";
    adjacentSeatCountCondition = (takenAdjacentSeats: number) => takenAdjacentSeats === 0;
    characterToChangeTo = "#";
}

class EmptyRule extends TakenAdjacentSeatRule {
    canApply = (character: string) => character === "#";
    adjacentSeatCountCondition = (takenAdjacentSeats: number) => takenAdjacentSeats >= 4;
    characterToChangeTo = "L";
}

const getAdjacentPlaces = (row: number, column: number, layout: string[][]): Array<[number, number]> => {
    const result = new Array<[number, number]>();
    for (let i = row - 1; i < row + 2; i++) {
        for (let j = column - 1; j < column + 2; j++) {
            if (i >= 0 && i < layout.length &&
                j >= 0 && j < layout[0].length &&
                !(i === row && j === column)) {
                result.push([i, j]);
            }
        }
    }

    return result;
}

const applyRules = (currentState: string[][], rules: Array<IRule>): [string[][], number] => {
    const nextState = currentState.map(x => x.map(c => `${c}`));
    let modifiedSeatCount = 0;

    for (let i = 0; i < currentState.length; i++) {
        for (let j = 0; j < currentState[i].length; j++) {
            for (const rule of rules) {
                if (rule.canApply(currentState[i][j])) {
                    const result = rule.apply(i, j, currentState);
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

const rules: Array<IRule> = [
    new FillRule(),
    new EmptyRule()
];

let modifiedSeatCount: number = 0;
do {
    const result = applyRules(layout, rules);
    modifiedSeatCount = result[1];
    layout = result[0];
}
while (modifiedSeatCount != 0);

console.log("Part 1, occupied seats: " + countOccupiedSeats(layout));