const Discord = require("discord.js");
const chalk = require("chalk");
const { logError } = require("../utils/functions");

module.exports = {
    name: Discord.Events.InteractionCreate,
    async execute(client, interaction) {
        try {
            if (interaction.isCommand()) {
                let command, cooldowns;

                if (interaction.isContextMenuCommand()) {
                    command = client.contextMenuCommands.get(interaction.commandName);
                    cooldowns = client.contextMenuCommandsCooldowns;
                } else if (interaction.isChatInputCommand()) {
                    command = client.slashCommands.get(interaction.commandName);
                    cooldowns = client.slashCommandsCooldowns;
                }

                if (!command) {
                    console.error(chalk.redBright(`No command matching ${interaction.commandName} was found.`));
                    return;
                }

                if (!cooldowns.has(command.data.name)) {
                    cooldowns.set(command.data.name, new Discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.data.name);
                const defaultCooldownDuration = 3;
                const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

                if (timestamps.has(interaction.user.id)) {
                    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const expiredTimestamp = Math.round(expirationTime / 1_000);
                        return interaction.reply({
                            content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                            ephemeral: true,
                        });
                    }
                }

                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

                try {
                    await command.execute(client, interaction);
                } catch (error) {
                    logError(error);

                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
                    } else {
                        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
                    }
                }
            }
        } catch (error) {
            logError(error);
        }
    },
};
