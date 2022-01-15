import { SlashCommandBuilder } from '@discordjs/builders';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types';
import { readdirSync } from 'fs';
import { EventEmitter } from 'events';
import { Command } from '../interfaces';
import { Collection, CommandInteraction } from 'discord.js';
import HandlerOptions from './handlerOptions';
import Options from './handlerOptions';
import client from './Client';
import _interaction from './interaction';
import path from 'path';

export class Handler extends EventEmitter {
    client: client;
    options: HandlerOptions;

    constructor(client: client, options: HandlerOptions) {
        super();
        this.client = client;
        this.options = new Options(options);

        this.client.slashCommands = new Collection();
        this.client.allCommands = new Collection();


        this.loadCommands().then(() => {
            if (options.registerCommands) this.registerSlashCommands();

            this.handleSlashCommands();
        })
    }

    loadCommands() {
        let allCommands: RESTPostAPIApplicationCommandsJSONBody[] = []

        return new Promise(async (resolve, reject) => {
            try {
                const commandFolderPath = path.join(__dirname, this.options.commandFolder);
                console.log(commandFolderPath)
                readdirSync(commandFolderPath).forEach((dir) => {
                    const commands = readdirSync(`${commandFolderPath}/${dir}`).filter(file => file.endsWith(".ts"));
                    for (const file of commands) {
                        const command: Command = require(`${commandFolderPath}/${dir}/${file}`).command;
                        const sub = new SlashCommandBuilder()
                        sub.setName(command.name)
                        sub.setDescription(command.description);
                        if (command.options) {
                            if (command.options.user)
                                if (command.options.user.length > 0)
                                    command.options.user.forEach((user) => {
                                        sub.addUserOption(userOption => userOption.setName(user.name).setDescription(user.description).setRequired(user.required))
                                    });

                            if (command.options.role)
                                if (command.options.role.length > 0)
                                    command.options.role.forEach((role) => {
                                        sub.addRoleOption(roleOption => roleOption.setName(role.name).setDescription(role.description).setRequired(role.required))
                                    });

                            if (command.options.channel)
                                if (command.options.channel.length > 0)
                                    command.options.channel.forEach((channel) => {

                                        sub.addChannelOption(channelOption => {

                                            channelOption.setName(channel.name).setDescription(channel.description).setRequired(channel.required);
                                            return channelOption

                                        })
                                    });
                            if (command.options.string)
                                if (command.options.string.length > 0)
                                    command.options.string.forEach((optionString) => {
                                        sub.addStringOption((stringOption) => {
                                            stringOption.setName(optionString.name).setDescription(optionString.description).setRequired(optionString.required)
                                            if (optionString.autocomplete)
                                                stringOption.setAutocomplete(optionString.autocomplete)
                                            if (optionString.choices)
                                                if (optionString.choices.length > 0)
                                                    optionString.choices.forEach(choices => {
                                                        stringOption.addChoice(String(choices.name), String(choices.value))
                                                    });
                                            return stringOption;
                                        })
                                    })
                        }

                        allCommands.push(sub.toJSON())
                        this.client.slashCommands.set(command.name, command);
                    }
                })
                this.client.allCommands.set('slashCommands', allCommands);
                resolve(allCommands)
            } catch (error) {
                reject(error);
            }
        })
    }

    async registerSlashCommands(guilds?: string[]) {
        const commands = this.client.allCommands.get('slashCommands');
        if (commands)
            if (guilds)
                guilds.forEach(guild => {
                    this.client.application?.commands.set(commands, guild);
                })
            else
                this.client.application?.commands.set(commands);
    }

    async handleSlashCommands() {
        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            const command = this.client.slashCommands.get(interaction.commandName);
            const member = interaction.guild?.members.cache.get(interaction.user.id);
            if (!command || !member) return;

            const int = _interaction<CommandInteraction>(interaction);

            if (this.options.deferReply === true) await interaction.deferReply();

            try {
                command.run(this.client, int)
            } catch {
                console.error()
            }
        })
    }
}