"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerOptions = /** @class */ (function () {
    // eventFolderPath: string;
    // ownerId: string;
    function HandlerOptions(options) {
        this.commandFolder = options.commandFolder;
        this.registerCommands = options.registerCommands;
        this.deferReply = options.deferReply;
        // this.eventFolderPath = options.eventFolderPath;
        // this.ownerId = options.ownerId;
    }
    return HandlerOptions;
}());
exports.default = HandlerOptions;
