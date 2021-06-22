const findMatch = require("../../findMatch");

const defaults = {
  name: "Find Match",
  command: "findmatch",
  params: "[team 1] [team 2] [tournament name] [map name]"
};

async function findMatchBot(message, params) {

  const [ team1, team2, tournamentName, mapName ] = params;

  const matchRes = await findMatch(team1, team2, tournamentName, mapName);

  if(matchRes.err) {
    return matchRes.message;
  }
  
  //Return only the pastehtmls
  let commandResponse = "";

  matchRes.data.forEach(match => {
    const { id, pasteUrl, mapName, team1, team2, tournamentName } = match;
    
    commandResponse += `${id} - (${tournamentName}) ${team1} vs ${team2} on ${mapName}: ${pasteUrl}\n`;
  });

  return commandResponse;

}

module.exports = {
  defaults,
  func: findMatchBot
};
