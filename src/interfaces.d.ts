import { CommandInteraction, Interaction, Message, MessageInteraction, MessagePayload, WebhookEditMessageOptions } from 'discord.js';
import { APIMessage, ChannelType } from 'discord-api-types/v9';
import client from './slashCommand/Client';

export enum Channel_Type {
    // GuildText = ChannelType.GuildText,
    GuildVoice = ChannelType.GuildVoice,
    GuildCategory = ChannelType.GuildCategory,
    GuildNews = ChannelType.GuildNews,
    GuildStore = ChannelType.GuildStore,
    GuildNewsThread = ChannelType.GuildNewsThread,
    GuildPublicThread = ChannelType.GuildPublicThread,
    GuildPrivateThread = ChannelType.GuildPrivateThread,
    GuildStageVoice = ChannelType.GuildStageVoice,
    GuildText = ChannelType.GuildText,
}

interface Run {
    (client: client, interaction: CommandInteraction ): void
}

export interface Command {
    name: string,
    description: string,
    memberpermissions?: string[],
    requiredroles?: string[],
    alloweduserids?: string[],
    options?: {
        string?: { name: string, description: string, required: false, autocomplete?: boolean, choices?: { name: string, value: string }[] }[],
        user?: { name: string, description: string, required: false }[],
        role?: { name: string, description: string, required: false }[],
        channel?: { name: string, description: string, required: false, channelType?: Channel_Type }[]
    },
    default_permission?: null,

    run: Run;
}

