class HandlerOptions {
    commandFolder: string;
    registerCommands: boolean;
    deferReply: boolean;
    // eventFolderPath: string;
    // ownerId: string;

    constructor(
        options: HandlerOptions
    ) {
        const main = require.main;
        this.commandFolder = `${main?.path}/${options.commandFolder}`;
        this.registerCommands = options.registerCommands;
        this.deferReply = options.deferReply;
        // this.eventFolderPath = options.eventFolderPath;
        // this.ownerId = options.ownerId;
    }
}

export default HandlerOptions;