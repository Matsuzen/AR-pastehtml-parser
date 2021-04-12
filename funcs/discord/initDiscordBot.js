const Discord = require("discord.js");
const DISCORD_SECRET = process.env.DISCORD_SECRET;

const discordBotCommands = require("./discordBotCommands");

async function initDiscordBot() {
  const client = new Discord.Client();

  client.on("ready", () => {
    console.log("Client connected");
  })

  client.on("message", discordBotCommands);

  client.login(DISCORD_SECRET);
}

module.exports = initDiscordBot;