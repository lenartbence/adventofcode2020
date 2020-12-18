import { readFileSync } from 'fs';

const initializeCubes = () => {
    const cubes = new Array<[number, number, number, number]>();
    const lines = readFileSync("day17\\input.txt", "utf-8").split("\r\n");
    for (const [y, line] of lines.entries()) {
        let x = 0;
        for (const char of line) {
            if (char === "#") {
                cubes.push([x, y, 0, 0]);
            }

            x++;
        }
    }

    return cubes;
}

const simulateCubeActivity = (initialActiveCubes: Array<[number, number, number, number]>, iterations: number): Array<[number, number, number, number]> => {
    let currentActiveCubes: Array<[number, number, number, number]> = initialActiveCubes.map(x => [x[0], x[1], x[2], x[3]]);

    for (let i = 0; i < iterations; i++) {
        const nextActiveCubes = new Array<[number, number, number, number]>();

        let minx = 0;
        let maxx = 0;
        let miny = 0;
        let maxy = 0;
        let minz = 0;
        let maxz = 0;
        let minw = 0;
        let maxw = 0;

        for (const cube of currentActiveCubes) {
            if (cube[0] < minx) minx = cube[0];
            if (cube[0] > maxx) maxx = cube[0];
            if (cube[1] < miny) miny = cube[1];
            if (cube[1] > maxy) maxy = cube[1];
            if (cube[2] < minz) minz = cube[2];
            if (cube[2] > maxz) maxz = cube[2];
            if (cube[3] < minw) minw = cube[3];
            if (cube[3] > maxw) maxw = cube[3];
        }

        for (let x = minx - 1; x <= maxx + 1; x++) {
            for (let y = miny - 1; y <= maxy + 1; y++) {
                for (let z = minz - 1; z <= maxz + 1; z++) {
                    for (let w = minw - 1; w <= maxw + 1; w++) {
                        const isActive = isCubeActive([x, y, z, w], currentActiveCubes);
                        const neighborCount = countActiveNeighbors([x, y, z, w], currentActiveCubes);

                        if ((isActive && (neighborCount === 2 || neighborCount === 3)) ||
                            (!isActive && neighborCount === 3)) {
                            nextActiveCubes.push([x, y, z, w]);
                        }
                    }
                }
            }
        }

        currentActiveCubes = nextActiveCubes;
    }

    return currentActiveCubes;
}

const isCubeActive = (cube: [number, number, number, number], activeCubes: Array<[number, number, number, number]>): boolean => {
    let isActive = false;
    for (const ac of activeCubes) {
        if (ac[0] === cube[0] && ac[1] === cube[1] && ac[2] === cube[2] && ac[3] === cube[3]) {
            isActive = true;
            break;
        }
    }

    return isActive;
}

const countActiveNeighbors = (cube: [number, number, number, number], activeCubes: Array<[number, number, number, number]>): number => {
    let count = 0;

    for (const ac of activeCubes) {
        if (areNeighbors(cube, ac)) {
            count++;
        }
    }

    return count;
}

const areNeighbors = (a: [number, number, number, number], b: [number, number, number, number]): boolean => {
    if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]) {
        return false;
    }

    const xdiff = Math.abs(a[0] - b[0]);
    const ydiff = Math.abs(a[1] - b[1]);
    const zdiff = Math.abs(a[2] - b[2]);
    const wdiff = Math.abs(a[3] - b[3]);

    return xdiff <= 1 && ydiff <= 1 && zdiff <= 1 && wdiff <= 1;
}

const activeCubes = initializeCubes();
const activeCubesAfterSimulation = simulateCubeActivity(activeCubes, 6);

console.log("Active cubes after simulation: " + activeCubesAfterSimulation.length);