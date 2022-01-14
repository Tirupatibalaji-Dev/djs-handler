import { Command } from '../interfaces';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/rest/v9';
import { ApplicationCommandDataResolvable, Client, ClientOptions, Collection } from 'discord.js';

class client extends Client {
    slashCommands: Collection<string, Command>;
    allCommands: Collection<string, RESTPostAPIApplicationCommandsJSONBody[]>;

    constructor(options: ClientOptions) {
        super(options);
        this.slashCommands = new Collection();
        this.allCommands = new Collection();
    }
}

export default client;