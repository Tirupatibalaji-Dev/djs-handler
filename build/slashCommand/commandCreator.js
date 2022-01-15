"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
var builders_1 = require("@discordjs/builders");
var fs_1 = require("fs");
var events_1 = require("events");
var discord_js_1 = require("discord.js");
var handlerOptions_1 = __importDefault(require("./handlerOptions"));
var interaction_1 = __importDefault(require("./interaction"));
var path_1 = __importDefault(require("path"));
var Handler = /** @class */ (function (_super) {
    __extends(Handler, _super);
    function Handler(client, options) {
        var _this = _super.call(this) || this;
        _this.client = client;
        _this.options = new handlerOptions_1.default(options);
        _this.client.slashCommands = new discord_js_1.Collection();
        _this.client.allCommands = new discord_js_1.Collection();
        _this.loadCommands().then(function () {
            if (options.registerCommands)
                _this.registerSlashCommands();
            _this.handleSlashCommands();
        });
        return _this;
    }
    Handler.prototype.loadCommands = function () {
        var _this = this;
        var allCommands = [];
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var commandFolderPath_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    commandFolderPath_1 = path_1.default.join(__dirname, this.options.commandFolder);
                    console.log(commandFolderPath_1);
                    (0, fs_1.readdirSync)(commandFolderPath_1).forEach(function (dir) {
                        var commands = (0, fs_1.readdirSync)("".concat(commandFolderPath_1, "/").concat(dir)).filter(function (file) { return file.endsWith(".ts"); });
                        var _loop_1 = function (file) {
                            var command = require("".concat(commandFolderPath_1, "/").concat(dir, "/").concat(file)).command;
                            var sub = new builders_1.SlashCommandBuilder();
                            sub.setName(command.name);
                            sub.setDescription(command.description);
                            if (command.options) {
                                if (command.options.user)
                                    if (command.options.user.length > 0)
                                        command.options.user.forEach(function (user) {
                                            sub.addUserOption(function (userOption) { return userOption.setName(user.name).setDescription(user.description).setRequired(user.required); });
                                        });
                                if (command.options.role)
                                    if (command.options.role.length > 0)
                                        command.options.role.forEach(function (role) {
                                            sub.addRoleOption(function (roleOption) { return roleOption.setName(role.name).setDescription(role.description).setRequired(role.required); });
                                        });
                                if (command.options.channel)
                                    if (command.options.channel.length > 0)
                                        command.options.channel.forEach(function (channel) {
                                            sub.addChannelOption(function (channelOption) {
                                                channelOption.setName(channel.name).setDescription(channel.description).setRequired(channel.required);
                                                return channelOption;
                                            });
                                        });
                                if (command.options.string)
                                    if (command.options.string.length > 0)
                                        command.options.string.forEach(function (optionString) {
                                            sub.addStringOption(function (stringOption) {
                                                stringOption.setName(optionString.name).setDescription(optionString.description).setRequired(optionString.required);
                                                if (optionString.autocomplete)
                                                    stringOption.setAutocomplete(optionString.autocomplete);
                                                if (optionString.choices)
                                                    if (optionString.choices.length > 0)
                                                        optionString.choices.forEach(function (choices) {
                                                            stringOption.addChoice(String(choices.name), String(choices.value));
                                                        });
                                                return stringOption;
                                            });
                                        });
                            }
                            allCommands.push(sub.toJSON());
                            _this.client.slashCommands.set(command.name, command);
                        };
                        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
                            var file = commands_1[_i];
                            _loop_1(file);
                        }
                    });
                    this.client.allCommands.set('slashCommands', allCommands);
                    resolve(allCommands);
                }
                catch (error) {
                    reject(error);
                }
                return [2 /*return*/];
            });
        }); });
    };
    Handler.prototype.registerSlashCommands = function (guilds) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var commands;
            var _this = this;
            return __generator(this, function (_b) {
                commands = this.client.allCommands.get('slashCommands');
                if (commands)
                    if (guilds)
                        guilds.forEach(function (guild) {
                            var _a;
                            (_a = _this.client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands, guild);
                        });
                    else
                        (_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands.set(commands);
                return [2 /*return*/];
            });
        });
    };
    Handler.prototype.handleSlashCommands = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.client.on('interactionCreate', function (interaction) { return __awaiter(_this, void 0, void 0, function () {
                    var command, member, int;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!interaction.isCommand())
                                    return [2 /*return*/];
                                command = this.client.slashCommands.get(interaction.commandName);
                                member = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(interaction.user.id);
                                if (!command || !member)
                                    return [2 /*return*/];
                                int = (0, interaction_1.default)(interaction);
                                if (!(this.options.deferReply === true)) return [3 /*break*/, 2];
                                return [4 /*yield*/, interaction.deferReply()];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2:
                                try {
                                    command.run(this.client, int);
                                }
                                catch (_c) {
                                    console.error();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Handler;
}(events_1.EventEmitter));
exports.Handler = Handler;
