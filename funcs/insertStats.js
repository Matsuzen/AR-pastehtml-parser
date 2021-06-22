const MatchStats = require("../models/MatchStats");
const PlayerStats = require("../models/PlayerStats");
const Player = require("../models/Player");

const fs = require("fs");

const createPlayer = require("./helpers/createPlayer");

async function insertStats(playersStats, woolTouches, tntKills, matchId, tournamentId) {
  //Loop every player and add stats

  for(const username in playersStats) {
    const { kills, assists, deaths, arrowsHit, arrowsTotal } = playersStats[username];
    const playerTntKills = tntKills[username];

    try {

      const playerRes = await createPlayer(username);

      if(playerRes.err) {
        console.log("Could not find or create player to insert stats", playerRes.e);
        continue;
      }

      const playerId = playerRes.id

      const playerWoolTouches = (woolTouches[username] && woolTouches[username].length) || 0;

      //Insert stats for the match for given player
      await MatchStats.create({
        playerId,
        matchId,
        kills, assists, deaths, arrowsHit, arrowsTotal,
        woolTouches: playerWoolTouches,
        tntKills: playerTntKills || 0
      });

    } 
    catch(e) {
      console.log(e);
      fs.appendFile(`${__dirname}/../errors`, `${e}\n`, err => {
        if(err) throw err;
      })
    }

  }
}

module.exports = insertStats;