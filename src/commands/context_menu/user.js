const Discord = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new Discord.ContextMenuCommandBuilder()
        .setName("User information")
        .setType(Discord.ApplicationCommandType.User)
        .setContexts(Discord.InteractionContextType.Guild),

    async execute(client, interaction) {
        const user = interaction.targetUser;
        await interaction.reply({ content: `This User is ${user}`, ephemeral: true });
    },
};
