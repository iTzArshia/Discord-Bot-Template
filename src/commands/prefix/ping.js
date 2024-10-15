module.exports = {
    name: "Ping",
    cooldown: 5,
    async execute(client, message, args, cmd) {
        await message.reply({ content: "Pong!" });
    },
};
