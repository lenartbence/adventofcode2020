"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var NopCommand = /** @class */ (function () {
    function NopCommand() {
        this.execute = function (parameter) {
            return 1;
        };
    }
    return NopCommand;
}());
var AccCommand = /** @class */ (function () {
    function AccCommand() {
        this.execute = function (parameter) {
            accumulator += parameter;
            return 1;
        };
    }
    return AccCommand;
}());
var JmpCommand = /** @class */ (function () {
    function JmpCommand() {
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
var accumulator = 0;
var position = 0;
var executeCommands = function () {
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var commandEntry = commands_1[_i];
        if (commandEntry.wasExecuted) {
            return;
        }
        position += commandEntry.command.execute(commandEntry.parameter);
        commandEntry.wasExecuted = true;
    }
};
executeCommands();
console.log("Part 1, accumulator = " + accumulator);
//# sourceMappingURL=solution.js.map