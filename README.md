<h1 align="center">An Advanced Discord Bot Template for YOU</h1>

<div align="center">
    <a href="https://github.com/iTzArshia/Discord-Bot-Template/stargazers"> <img src="https://img.shields.io/github/stars/iTzArshia/Discord-Bot-Template.svg" alt="GitHub stars"/> </a>
    <a href="https://github.com/iTzArshia/Discord-Bot-Template/network"> <img src="https://img.shields.io/github/forks/iTzArshia/Discord-Bot-Template.svg" alt="GitHub forks"/> </a>
    <a href="https://discord.gg/nKrBshQvcK"> <img src="https://badgen.net/discord/members/nKrBshQvcK" alt="iTz Development Discord"/> </a>
    <a href="https://discord.gg/8hr9CRqmfc"> <img src="https://badgen.net/discord/members/8hr9CRqmfc" alt="iTz Club Discord"/> </a>
</div>

# 📝 Introduction

Welcome to the **Discord Bot Template**! This open-source project provides a robust foundation for creating your own Discord bot, featuring essential functionalities already integrated. Built with JavaScript, utilizing [Node.js v16.9.0](https://nodejs.org/en) and [Discord.js v14](discord.js.org/), this template allows developers to easily set up a bot with command handling, event management, and more!

With a focus on usability and flexibility, this template enables you to jump right into developing your bot's unique features without worrying about the boilerplate code. Whether you're building a utility bot, a game bot, or anything in between, this template has you covered. Explore its capabilities and customize it to fit your needs!

## 🔥 Features
- **Event Handler**: Efficiently manage and respond to Discord events.
- **Command Handler**: Supports both prefix commands and slash commands.
- **Context Menu Commands**: Easily add context menu commands for improved user interaction.
- **Cooldown System**: Prevent command spamming with customizable cooldowns.
- **Command Registration**: Easily register your bot commands on Discord.
- **Anti-Crash**: Built-in safety mechanisms to ensure your bot stays online.
- **Error & Warn Logging**: Comprehensive logging system to monitor errors and warnings.
- **And many more features waiting for you to explore!**

## 🚧 Requirements

1. **Discord Bot Token**: Follow this **[guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)** to create a bot application.  
   - Ensure you enable "Message Content Intent" in the Discord Developer Portal.
2. **[Node.js](https://nodejs.org/en/download/)** version 16.9.0 or higher. It's recommended to use the latest LTS (Long Term Support) version for the best performance and compatibility.


# 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/iTzArshia/Discord-Bot-Template.git
   ```

2. Navigate into the project directory:
   ```bash
   cd discord-bot-template
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Go to `.env` and fill out the values:
    ```plaintext
    APPLICATION_ID="CLIENT ID HERE",
    BOT_TOKEN="BOT TOKEN HERE"
    ```
5. Go to `config.json` and fill out the values:
    ```json
    {
        "prefix": "Your desired command prefix",
    }
    ```
6. After the installation completes, run `node register.js` to deploy application commands, and then run `node index.js` to start the bot.

7. Once your bot is up and running, you can start adding your own commands and events by modifying the appropriate files in the `commands` and `events` directories. The template provides examples to help you get started.

# ❤️ Support
You can **[support](https://reymit.com/itz_arshia)** me by donating if you like the project!
> You can make international, crypto, or Tomanian donations through Reymit

##
Made with ❤️ and JavaScript, Don't Forget to ⭐