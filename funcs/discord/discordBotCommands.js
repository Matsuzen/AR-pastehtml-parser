/*

!lb [ kills ] [ page ] [ tournamentName ]
!user [ username ]
!match [ team1 ] [ team2 ]

*/

const exportStats = require("../exportStats");

const commands = {
  lb: doLeaderBoard,

}

async function discordBotCommands(message) {
  //Not a command
  if(message.content[0] !== "!") return;

  const splitMsg = message.content.replace("!", "").split(" ");
  const [ command, param, param2, param3 ] = splitMsg;

  const commandFunc = commands[command];

  if(!commandFunc) return;

  const commandResponse = await commandFunc(param, param2, param3)
  .catch(e => console.log(e));

  message.channel.send({ embed: commandResponse })

}

async function doLeaderBoard(sortBy = "kills", page = 1, tournamentName = "Ranked") {
  const stats = await exportStats(sortBy, tournamentName, page);
  
  const embedOptions = {
    title: `${tournamentName} stats`,
    description: "",
    fields: []
  }
  
  const headers = ["Kills", "Assists", "Deaths", "Arrows (acc%)", "Touches", "Matches"];

  //Insert each stat listed as headers
  headers.forEach((statName, i) => {

    embedOptions.description += `${statName}`

    if(i < headers.length - 1) {
      embedOptions.description += " - ";
    } else {
      embedOptions.description += "\n";
    }
  })


  stats.forEach(({ username, kills, assists, deaths, arrowsHit, arrowsTotal, accuracy, woolTouches, matchCount }, i) => {
    embedOptions.fields.push({
      name: "\u200b",
      value: `${i + 1}: ${username} - ${kills} - ${assists} - ${deaths} - ${arrowsHit} / ${arrowsTotal} (${accuracy}%) - ${woolTouches} - ${matchCount} \n`
    })
  });

  return embedOptions;
}

module.exports = discordBotCommands;