const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const chalk = require("chalk");
const { logError } = require("./src/utils/functions");
require("dotenv").config();

const commands = [];

const contextMenuCommandsPath = path.join(__dirname, "src", "commands", "context_menu");
const contextMenuCommandFiles = fs.readdirSync(contextMenuCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of contextMenuCommandFiles) {
    const filePath = path.join(contextMenuCommandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        if (!("data" in command) && !("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "data" and "execute" property.`));
        else if (!("data" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "data" property.`));
        else if (!("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "execute" property.`));
    }
}

const slashCommandsPath = path.join(__dirname, "src", "commands", "slash");
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter((file) => file.endsWith(".js"));

for (const file of slashCommandFiles) {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        if (!("data" in command) && !("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "data" and "execute" property.`));
        else if (!("data" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "data" property.`));
        else if (!("execute" in command))
            console.log(chalk.yellowBright(`[WARNING] The command at "${filePath}" is missing a required "execute" property.`));
    }
}

const rest = new Discord.REST().setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log(chalk.cyanBright(`Started refreshing ${commands.length} application commands.`));

        const data = await rest.put(Discord.Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands });

        console.log(chalk.greenBright(`Successfully reloaded ${data.length} application commands.`));
    } catch (error) {
        logError(error);
    }
})();
