class HandlerOptions {
    commandFolder: string;
    registerCommands: boolean;
    deferReply: boolean;
    guilds?: string[];
    // eventFolderPath: string;
    // ownerId: string;

    constructor(
        options: HandlerOptions
    ) {
        const main = require.main;
        this.commandFolder = `${main?.path}/${options.commandFolder}`;
        this.registerCommands = options.registerCommands;
        this.deferReply = options.deferReply;
        this.guilds = options.guilds;
        // this.eventFolderPath = options.eventFolderPath;
        // this.ownerId = options.ownerId;
    }
}

export default HandlerOptions;