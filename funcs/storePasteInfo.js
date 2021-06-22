const parseHtml = require("./parseHtml");
const insertMatch = require("./insertMatch");
const insertStats = require("./insertStats");
const insertWoolTouches = require("./insertWoolTouches");

//Tournament is optional
async function storePasteInfo(url, tournament, i) {
  try {
    const parsedHtmlRes = await parseHtml(url, i);
    
    if(parsedHtmlRes.err) {
      return parsedHtmlRes;
    }

    const { matchDetails, teams, woolTouches, tntKills, playersStats } = parsedHtmlRes;

    //Both teams need to have 4 members to insert match stats
    /* if(teams[0].members.length !== 4 || teams[1].members.length !== 4) {
      return {
        err: true,
        message: "Teams are not full, can not insert stats",
      }
    } */

    const { newMatchId, tournamentId } = await insertMatch(matchDetails, teams, tournament);
  
    const newStats = await insertStats(playersStats, woolTouches, tntKills, newMatchId, tournamentId);

    const newWoolTouches = await insertWoolTouches(woolTouches, newMatchId)
    
    return {
      message: "Succesfully stored pastehtml's info"
    }

  }
  catch(e) {
    return {
      err: true,
      message: `Could not store pastehtml's info: ${e}`
    }
  }


}

module.exports = storePasteInfo;