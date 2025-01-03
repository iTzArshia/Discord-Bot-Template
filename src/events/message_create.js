const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../../config.json");
const { logError } = require("../utils/functions");

module.exports = {
    name: Discord.Events.MessageCreate,
    async execute(client, message) {
        try {
            if (message.content.startsWith(config.prefix) || message.content.startsWith(`<@${client.user.id}>`)) {
                let prefix;

                if (message.content.startsWith(config.prefix)) prefix = config.prefix;
                if (message.content.startsWith(`<@${client.user.id}>`)) prefix = `<@${client.user.id}>`;

                const args = message.content
                    .slice(prefix.length)
                    .split(/ +/)
                    .filter((arg) => arg !== "");
                const cmd = args.shift().toLowerCase();
                const command = client.prefixCommands.get(cmd);

                if (!command) {
                    console.error(chalk.redBright(`No command matching ${cmd} was found.`));
                    return;
                }

                const cooldowns = client.prefixCommandsCooldowns;

                if (!cooldowns.has(command.data.name)) {
                    cooldowns.set(command.data.name, new Discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name.toLowerCase());
                const defaultCooldownDuration = 3;
                const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const expiredTimestamp = Math.round(expirationTime / 1_000);

                        const embed = new Discord.EmbedBuilder()
                            .setColor("Yellow")
                            .setAuthor({ name: "⚠️ Cooldown", iconURL: client.user.displayAvatarURL({ size: 1024 }) })
                            .setDescription(
                                `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`
                            );

                        await message.reply({ embeds: [embed] }).then((msg) => {
                            setTimeout(async () => {
                                await msg.delete().catch(() => null);
                            }, 5 * 1_000);
                        });
                    }
                }

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

                try {
                    await command.execute(client, message, args, cmd);
                } catch (error) {
                    logError(error);

                    const embed = new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ name: "❌ Error", iconURL: client.user.displayAvatarURL({ size: 1024 }) })
                        .setDescription("There was an error while executing this command!");

                    await message.reply({ embeds: [embed] }).then((msg) => {
                        setTimeout(async () => {
                            await msg.delete().catch(() => null);
                        }, 5 * 1_000);
                    });
                }
            }
        } catch (error) {
            logError(error);
        }
    },
};
