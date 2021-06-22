/*

!lb [ kills ] [ page ] [ tournamentName ]
!user [ username ]

!addtournament [ name ] [ dateStart ] [ dateEnd ]
!addstats [ url ] [ tournamentName ]
!findmatch [ team1 ] [ team2 ] optionals: [ tournamentName ] [ mapName ]
!removeMatch [ matchId ]

*/

let commands, commandRoles;

const initCommands = require("./initCommands");
initCommands().then(commandRes => {
  commands = commandRes.commands;
  commandRoles = commandRes.commandRoles
})

async function discordBotCommands(message) {

  //Not a command
  if(message.content[0] !== commands.Prefix) return;

  //Split the discord message. First word is the command and the rest are parameters for each command
  const splitMsg = message.content.replace(commands.Prefix, "").split(" ");
  const [ command, ...params ] = splitMsg;

  const commandFunc = commands[command];

  if(!commandFunc) return;

  try {

    const commandResponse = await commandFunc(message, params, command);

    //err is always a string
    if(commandResponse.err) {
      return message.channel.send(commandResponse.message);      
    } 

    //Command response can be different based on the command (String, embed, etc)
    message.channel.send(commandResponse);
  } 
  catch(e) {
    message.channel.send(`Could not execute command (${command}): ${e}`)
  }

}

module.exports = discordBotCommands;