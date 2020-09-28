const Match = require("../models/Match");
const Tournament = require("../models/Tournament");
 
async function insertMatch(matchDetails, teams, tournamentName) {
  //Tournament name given, find the ID
  //Optional
  let tournamentId;

  if(tournamentName) {
    const tournamentRes = await Tournament.findOne({
      where: {
        name: tournamentName
      }
    });
    tournamentId = tournamentRes && tournamentRes.dataValues.id;
  }

  const { matchName, mapName, matchDate, matchLength, winners } = matchDetails;

  const [ team1, team2 ] = teams;

  try {
  
    const newMatch = await Match.create({
      tournamentId,
      matchName,
      mapName,
      matchDate: new Date(matchDate),
      matchLength,
      winners,
      team1: team1.teamName,
      team2: team2.teamName
    });

    console.log(newMatch.dataValues);

    //Return match & tournament IDs to store stats
    return {
      newMatchId: newMatch.dataValues.id,
      tournamentId
    }

  }
  catch(e) {
    console.log(e);
  }

}

module.exports = insertMatch;