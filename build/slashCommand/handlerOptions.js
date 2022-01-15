"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerOptions = /** @class */ (function () {
    // eventFolderPath: string;
    // ownerId: string;
    function HandlerOptions(options) {
        var main = require.main;
        this.commandFolder = "".concat(main === null || main === void 0 ? void 0 : main.path, "/").concat(options.commandFolder);
        this.registerCommands = options.registerCommands;
        this.deferReply = options.deferReply;
        this.guilds = options.guilds;
        // this.eventFolderPath = options.eventFolderPath;
        // this.ownerId = options.ownerId;
    }
    return HandlerOptions;
}());
exports.default = HandlerOptions;
