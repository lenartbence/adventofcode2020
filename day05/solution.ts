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
const seatIdsOrderedDescending = seatIds.sort((a, b) => b - a);

const part1 = () => {
    console.log("Part 1, highest seat ID: " + seatIdsOrderedDescending[0]);
}

const part2 = () => {
    let i = 0;
    while (i < seatIdsOrderedDescending.length - 1 && seatIdsOrderedDescending[i] === seatIdsOrderedDescending[i + 1] + 1) {
        i++;
    }

    if (i == seatIdsOrderedDescending.length - 1) {
        console.log("Could not find seat id");
    }
    else {
        console.log("Part 2, my seat id: " + (seatIdsOrderedDescending[i] - 1));
    }
}

part1();
part2();