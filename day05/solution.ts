import { readFileSync } from 'fs';

const boardingPasses = readFileSync("day05\\input.txt", "utf-8").split("\r\n");

const getSeatId = (boardingPass: string): number => {
    const row = narrowLocation(boardingPass.substring(0, 7), 0, 127, "F", "B");
    const column = narrowLocation(boardingPass.substring(7), 0, 7, "L", "R");
    const seatId = row * 8 + column;

    return seatId;
}

const narrowLocation = (data: string, first: number, last: number, lowerIndicator: string, upperIndicator: string): number => {
    if (first === last) {
        return first;
    }

    const center = first + (last - first) / 2;

    if (data[0] === lowerIndicator) {
        return narrowLocation(data.substring(1), first, Math.floor(center), lowerIndicator, upperIndicator);
    }
    else if (data[0] === upperIndicator) {
        return narrowLocation(data.substring(1), Math.ceil(center), last, lowerIndicator, upperIndicator);
    }

    return -1;
}

const seatIds = boardingPasses.map(getSeatId);

console.log("Part 1, highest seat ID: " + seatIds.sort((a, b) => b - a)[0]);