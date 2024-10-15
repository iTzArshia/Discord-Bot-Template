const Discord = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new Discord.SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!").setContexts(Discord.InteractionContextType.Guild),
    async execute(client, interaction) {
        await interaction.reply({ content: "Pong!", ephemeral: true });
    },
};
