const Match = require("../models/Match");
const Tournament = require("../models/Tournament");

const fs = require("fs");
 
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

  const { pasteName, pasteUrl, matchName, mapName, matchDate, matchLength, winners } = matchDetails;

  const [ team1, team2 ] = teams;

  try {
  
    const newMatch = await Match.create({
      tournamentId,
      pasteName,
      pasteUrl,
      matchName,
      mapName,
      matchDate: new Date(matchDate),
      matchLength,
      winners,
      team1: team1.teamName,
      team2: team2.teamName
    });

    //Return match & tournament IDs to store stats
    return {
      newMatchId: newMatch.dataValues.id,
      tournamentId
    }

  }
  catch(e) {
    console.log(e);

    fs.appendFile(`${__dirname}/../errors`, `${e}\n`, err => {
      if(err) throw err;
    })
  }

}

module.exports = insertMatch;