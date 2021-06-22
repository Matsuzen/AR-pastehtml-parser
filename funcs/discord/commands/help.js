
const DiscordCommand = require("../../../models/DiscordCommand");

const defaults = {
  name: "Command Help",
  command: "help",
  params: ""
}

async function help(message, params) {
  try {
    const storedCommands = await DiscordCommand.findAll({ 
      raw: true, 
      order: [["command", "ASC"]] 
    });

    let commandRes = "List of commands (required) [optional] \n";

    storedCommands.forEach(({ name, command, params }) => {

      if(name === "Wild Card" || name === "Prefix") return;

      //List every command with the parameters
      commandRes += `**${command}** ${params}\n`;
    });

    return commandRes;

  }
  catch(e) {
    return `Could not list commands: ${e}`;
  }
}

module.exports = {
  defaults,
  func: help
}