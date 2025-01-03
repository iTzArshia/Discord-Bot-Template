const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { logError, logWarning } = require("./src/utils/functions");

// ? Discord Client Constructor

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent],
    presence: {
        activities: [
            {
                name: `Github.com/iTzArshia`,
                type: Discord.ActivityType.Watching,
            },
        ],
        status: "online",
    },
});

client.contextMenuCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.prefixCommands = new Discord.Collection();
client.contextMenuCommandsCooldowns = new Discord.Collection();
client.slashCommandsCooldowns = new Discord.Collection();
client.prefixCommandsCooldowns = new Discord.Collection();

// ? Handlers
// ? Event Handler

const eventsPath = path.join(__dirname, "src", "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if ("name" in event && "execute" in event) {
        const callBack = (...args) => event.execute(client, ...args);
        if (event.once) {
            client.once(event.name, callBack);
        } else {
            client.on(event.name, callBack);
        }
    } else {
        if (!("name" in event) && !("execute" in event))
            console.log(chalk.yellowBright(`[WARNING] :: The event at "${filePath}" is missing a required "name" and "execute" property.`));
        else if (!("name" in event))
            console.log(chalk.yellowBright(`[WARNING] :: The event at "${filePath}" is missing a required "name" property.`));
        else if (!("execute" in event))
            console.log(chalk.yellowBright(`[WARNING] :: The event at "${filePath}" is missing a required "execute" property.`));
    }
}

// ? Context Menu Commands Handler

const contextMenuCommandsPath = path.join(__dirname, "src", "commands", "context_menu");
const contextMenuCommandFiles = fs.readdirSync(contextMenuCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of contextMenuCommandFiles) {
    const filePath = path.join(contextMenuCommandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.contextMenuCommands.set(command.data.name, command);
    } else {
        if (!("data" in command) && !("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "data" and "execute" property.`));
        else if (!("data" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "data" property.`));
        else if (!("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "execute" property.`));
    }
}

// ? Slash Commands Handler

const slashCommandsPath = path.join(__dirname, "src", "commands", "slash");
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.slashCommands.set(command.data.name, command);
    } else {
        if (!("data" in command) && !("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "data" and "execute" property.`));
        else if (!("data" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "data" property.`));
        else if (!("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "execute" property.`));
    }
}

// ? Prefix Commands Handler

const prefixCommandsPath = path.join(__dirname, "src", "commands", "prefix");
const prefixCommandFiles = fs.readdirSync(prefixCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of prefixCommandFiles) {
    const filePath = path.join(prefixCommandsPath, file);
    const command = require(filePath);

    if ("name" in command && "execute" in command) {
        client.prefixCommands.set(command.name.toLowerCase(), command);
    } else {
        if (!("name" in command) && !("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "name" and "execute" property.`));
        else if (!("name" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "name" property.`));
        else if (!("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] :: The command at "${filePath}" is missing a required "execute" property.`));
    }
}

// ? Anti Cras

process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.redBright("[Anti Crash] :: Unhandled Rejection/Catch"));
    logError(reason);
});

process.on("uncaughtException", (error, origin) => {
    console.error(chalk.redBright("[Anti Crash] :: Uncaught Exception/Catch"));
    logError(error);
});

process.on("warning", (warning) => {
    console.warn(chalk.yellowBright("[Anti Crash] :: Warning"));
    logWarning(warning);
});

process.on("SIGINT", () => {
    console.log(chalk.cyanBright("[Process] :: Received SIGINT. Shutting down gracefully..."));
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log(chalk.cyanBright("[Process] :: Received SIGTERM. Shutting down gracefully..."));
    process.exit(0);
});

// ? Login to Discord Client

client.login(process.env.BOT_TOKEN);
