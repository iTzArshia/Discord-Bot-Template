const Discord = require("discord.js");
const chalk = require("chalk");
const { logError } = require("../utils/functions");

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            console.log(chalk.cyanBright(`Ready! Successfuly Logged in as ${client.user.tag}.`));
        } catch (error) {
            logError(error);
        }
    },
};
