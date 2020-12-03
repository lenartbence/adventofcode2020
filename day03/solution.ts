import * as fs from 'fs';

enum cellType {
    blank,
    tree
}

const initializeMap = (input: string): cellType[][] => {
    const lines = input.split("\r\n");
    let rows: cellType[][] = [];
    lines.forEach(line => {
        let row = [];
        for (let i = 0; i < line.length; i++) {
            row.push(line[i] == '.' ? cellType.blank : cellType.tree);
        }
        rows.push(row);
    });

    return rows;
}

const map = initializeMap(fs.readFileSync("day03/input.txt", "utf-8"));

const slide = (horizontalMovement: number, verticalMovement: number): number => {
    let i = 0;
    let j = 0;
    let treeCounter = 0;
    while (i < map.length) {
        if (map[i][j] == cellType.tree) {
            treeCounter++;
        }

        i += verticalMovement;
        j += horizontalMovement;
        if (j >= map[0].length) {
            j -= map[0].length;
        }
    }

    return treeCounter;
}

const part1 = () => {
    const treesEncountered = slide(3, 1);
    console.log(`Part 1, encountered ${treesEncountered} trees.`);
}

part1();