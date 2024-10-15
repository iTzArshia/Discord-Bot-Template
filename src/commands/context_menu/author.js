const Discord = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new Discord.ContextMenuCommandBuilder()
        .setName("Author information")
        .setType(Discord.ApplicationCommandType.Message)
        .setContexts(Discord.InteractionContextType.Guild),

    async execute(client, interaction) {
        const user = interaction.targetMessage.author;
        await interaction.reply({ content: `Author of this message is ${user}`, ephemeral: true });
    },
};
