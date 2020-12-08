"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var accumulator;
var NopCommand = /** @class */ (function () {
    function NopCommand() {
        this.type = "nop";
        this.execute = function (parameter) {
            return 1;
        };
    }
    return NopCommand;
}());
var AccCommand = /** @class */ (function () {
    function AccCommand() {
        this.type = "acc";
        this.execute = function (parameter) {
            accumulator += parameter;
            return 1;
        };
    }
    return AccCommand;
}());
var JmpCommand = /** @class */ (function () {
    function JmpCommand() {
        this.type = "jmp";
        this.execute = function (parameter) {
            return parameter;
        };
    }
    return JmpCommand;
}());
var CommandEntry = /** @class */ (function () {
    function CommandEntry(command, parameter) {
        this.command = command;
        this.parameter = parameter;
        this.wasExecuted = false;
    }
    return CommandEntry;
}());
var commandRepository = new Map([
    ["nop", new NopCommand()],
    ["acc", new AccCommand()],
    ["jmp", new JmpCommand()]
]);
var commands = fs_1.readFileSync("day08\\input.txt", "utf-8").split("\r\n")
    .map(function (entry) {
    var parts = entry.split(" ");
    var command = commandRepository.get(parts[0]);
    var parameter = parseInt(parts[1]);
    return new CommandEntry(command, parameter);
});
var initializeCommandExecution = function () {
    accumulator = 0;
    commands.forEach(function (x) { return x.wasExecuted = false; });
};
var fixCommands = function (commands) {
    var fixed = false;
    var i = 0;
    var fixedCommands;
    while (!fixed && i < commands.length) {
        if (commands[i].command.type === "nop" || commands[i].command.type === "jmp") {
            fixedCommands = commands.map(function (x) { return new CommandEntry(x.command, x.parameter); });
            swapCommandType(fixedCommands[i]);
            fixed = executeCommands(fixedCommands);
        }
        i++;
    }
    return fixed ? fixedCommands : commands;
};
var swapCommandType = function (commandEntry) {
    console.log("swapping command type " + commandEntry.command.type);
    if (commandEntry.command.type === "nop") {
        commandEntry.command = commandRepository.get("jmp");
    }
    else if (commandEntry.command.type === "jmp") {
        commandEntry.command = commandRepository.get("nop");
    }
};
var executeCommands = function (commands) {
    initializeCommandExecution();
    var position = 0;
    var currentCommandEntry = commands[position];
    while (position < commands.length && !currentCommandEntry.wasExecuted) {
        position += currentCommandEntry.command.execute(currentCommandEntry.parameter);
        currentCommandEntry.wasExecuted = true;
        currentCommandEntry = commands[position];
    }
    return position >= commands.length;
};
var fixResult = fixCommands(commands);
executeCommands(fixResult);
console.log("Accumulator = " + accumulator);
//# sourceMappingURL=solution.js.map