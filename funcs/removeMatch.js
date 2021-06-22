const Match = require("../models/Match");
const MatchStats = require("../models/MatchStats");
const WoolTouch = require("../models/WoolTouch");

async function removeMatch(matchFinder) {

  const params = {
    latest: {
      where: {},
      limit: 1,
      order: [ ["createdAt", "DESC"] ]
    }
  }

  try {
    
    let options = params[matchFinder] || { 
      //The finder can either be a number(match's Id) or a string(pastehtml's url)
      where: { 
        [!isNaN(parseInt(matchFinder)) ? "id" : "pasteUrl"]: matchFinder
      } 
    };

    const matchExists = await Match.findOne(options);

    if(!matchExists) {
      throw "Match does not exist";
    }

    const match = Match.destroy(options)

    //Use the matchId key for deleting stats and wool touches from other tables
    const { id, pasteUrl } = matchExists.dataValues;

    const matchIdOptions = {
      where: {
        matchId: id
      }
    }
    const matchStats = MatchStats.destroy(matchIdOptions)

    const woolTouches = WoolTouch.destroy(matchIdOptions)

    const res = await Promise.all([match, matchStats, woolTouches]);

    return {
      message: `Succesfully removed match from DB: ${pasteUrl}`
    }
  }
  catch(e) {
    return {
      err: true,
      message: `Could not delete match: ${e}`
    }
  }
}

module.exports = removeMatch;