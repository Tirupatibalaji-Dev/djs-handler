class HandlerOptions {
    commandFolder: string;
    registerCommands: boolean;
    deferReply: boolean;
    // eventFolderPath: string;
    // ownerId: string;

    constructor (
        options: HandlerOptions
    ) {
        this.commandFolder = options.commandFolder;
        this.registerCommands = options.registerCommands;
        this.deferReply = options.deferReply;
        // this.eventFolderPath = options.eventFolderPath;
        // this.ownerId = options.ownerId;
    }
}

export default HandlerOptions;