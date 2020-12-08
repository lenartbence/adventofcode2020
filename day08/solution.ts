import { readFileSync } from 'fs';

interface ICommand {
    execute: (parameter: number) => number
}

class NopCommand implements ICommand {
    execute = (parameter: number) => {
        return 1;
    }
}

class AccCommand implements ICommand {
    execute = (parameter: number) => {
        accumulator += parameter;
        return 1;
    }
}

class JmpCommand implements ICommand {
    execute = (parameter: number) => {
        return parameter;
    }
}

class CommandEntry {
    command: ICommand;
    parameter: number;
    wasExecuted: boolean;

    constructor(command: ICommand, parameter: number) {
        this.command = command;
        this.parameter = parameter;
        this.wasExecuted = false;
    }
}

const commandRepository: Map<string, ICommand> = new Map([
    ["nop", new NopCommand()],
    ["acc", new AccCommand()],
    ["jmp", new JmpCommand()]
]);

const commands: Array<CommandEntry> = readFileSync("day08\\input.txt", "utf-8").split("\r\n")
    .map(entry => {
        const parts = entry.split(" ");
        const command: ICommand = commandRepository.get(parts[0]);
        const parameter: number = parseInt(parts[1]);
        return new CommandEntry(command, parameter);
    })

let accumulator: number = 0;
let position: number = 0;
let currentCommand = commands[position];

while (!currentCommand.wasExecuted) {
    position += currentCommand.command.execute(currentCommand.parameter);
    currentCommand.wasExecuted = true;
    currentCommand = commands[position];
}

console.log("Part 1, accumulator = " + accumulator);