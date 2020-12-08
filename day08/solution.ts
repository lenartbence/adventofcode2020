import { readFileSync } from 'fs';

let accumulator: number;

interface ICommand {
    type: string;

    execute: (parameter: number) => number;
}

class NopCommand implements ICommand {
    type: string = "nop";

    execute = (parameter: number) => {
        return 1;
    }
}

class AccCommand implements ICommand {
    type: string = "acc";

    execute = (parameter: number) => {
        accumulator += parameter;
        return 1;
    }
}

class JmpCommand implements ICommand {
    type: string = "jmp";

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

const fixCommands = (commands: Array<CommandEntry>): Array<CommandEntry> => {
    let fixed: boolean = false;
    let i: number = 0;
    let fixedCommands: Array<CommandEntry>;
    while (!fixed && i < commands.length) {
        if (commands[i].command.type === "nop" || commands[i].command.type === "jmp") {
            fixedCommands = commands.map(x => new CommandEntry(x.command, x.parameter));
            swapCommandType(fixedCommands[i]);
            fixed = executeCommands(fixedCommands);
        }
        i++;
    }

    return fixed ? fixedCommands : commands;
}

const swapCommandType = (commandEntry: CommandEntry) => {
    if (commandEntry.command.type === "nop") {
        commandEntry.command = commandRepository.get("jmp");
    }
    else if (commandEntry.command.type === "jmp") {
        commandEntry.command = commandRepository.get("nop");
    }
}

const executeCommands = (commands: Array<CommandEntry>): boolean => {
    accumulator = 0;
    commands.forEach(x => x.wasExecuted = false);
    let position: number = 0;
    let currentCommandEntry: CommandEntry = commands[position];
    while (position < commands.length && !currentCommandEntry.wasExecuted) {
        position += currentCommandEntry.command.execute(currentCommandEntry.parameter);
        currentCommandEntry.wasExecuted = true;
        currentCommandEntry = commands[position];
    }

    return position >= commands.length;
}

const fixResult = fixCommands(commands);
executeCommands(fixResult);
console.log("Accumulator = " + accumulator);