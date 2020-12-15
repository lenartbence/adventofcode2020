const startingNumbers = "8,11,0,19,1,2".split(",").map(x => parseInt(x));

let lastNumberSpoken: [number, boolean];
const bruteForce = (numbers: Array<number>, target:number) => {
    const numbersSpoken = new Map<number, number>();

    for (let i = 0; i < startingNumbers.length; i++) {
        numbersSpoken.set(startingNumbers[i], i);
        lastNumberSpoken = [startingNumbers[i], false];
    }

    for (let i = startingNumbers.length; i < target; i++) {
        let newNumber = 0;
        if (lastNumberSpoken[1]) {
            newNumber = i - 1 - numbersSpoken.get(lastNumberSpoken[0]);
        }

        numbersSpoken.set(lastNumberSpoken[0], i - 1);

        const wasSpokenBefore = numbersSpoken.has(newNumber);
        lastNumberSpoken = [newNumber, wasSpokenBefore];

        //console.log((i + 1) + ". " + newNumber);
    }
}

bruteForce(startingNumbers, 30000000);

console.log(lastNumberSpoken[0]);