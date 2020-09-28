const parseHtml = require("./parseHtml");
const insertMatch = require("./insertMatch");
const insertStats = require("./insertStats");
const insertWoolTouches = require("./insertWoolTouches");

//Tournament is optional
async function storePasteInfo(url, tournament) {
  try {
    const { matchDetails, teams, woolTouches, playersStats } = await parseHtml(url);
  
    const { newMatchId, tournamentId } = await insertMatch(matchDetails, teams, tournament);
  
    const newStats = await insertStats(playersStats, woolTouches, newMatchId, tournamentId);

    const newWoolTouches = await insertWoolTouches(woolTouches, newMatchId);

  }
  catch(e) {
    console.log(e);
  }


}

module.exports = storePasteInfo;