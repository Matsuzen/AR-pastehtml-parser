const MatchStats = require("../models/MatchStats");
const PlayerStats = require("../models/PlayerStats");
const Player = require("../models/Player");

async function insertStats(playersStats, woolTouches, matchId, tournamentId) {
  //Loop every player and add stats

  for(const username in playersStats) {
    const { kills, assists, deaths, arrowsHit, arrowsTotal } = playersStats[username];

    try {

      const player = await Player.findOne({ where: { username } });

      let playerId = player && player.dataValues.id;

      //Add the username to "Player" if it doesn't already exist
      if(!playerId) {
        const newPlayer = await Player.create({ username })
        //Same player could already be in creation from another paste
        .catch(async () => {
          const player = await Player.findOne({ where: { username }});
          playerId = player.dataValues.id;
        });

        if(newPlayer) {
          playerId = newPlayer.dataValues.id;
        }
      }

      const playerWoolTouches = (woolTouches[username] && woolTouches[username].length) || 0;

      //Insert stats for the match for given player
      const newMatchStats = await MatchStats.create({
        playerId,
        matchId,
        kills, assists, deaths, arrowsHit, arrowsTotal,
        woolTouches: playerWoolTouches
      });

      //Increment total stats for player of given tournament
      const playerStats = await PlayerStats.findOne({
        where: {
          playerId,
          tournamentId
        }
      })
      
      //Player has no total stats object, create it
      if(!playerStats) {
        const newPlayerStats = await PlayerStats.create({
          playerId,
          tournamentId,
          kills, assists, deaths, arrowsHit, arrowsTotal,
          woolTouches: playerWoolTouches
        });

        continue;
      }

      //Otherwise increment the existing one
      const updatedPlayerStats = await PlayerStats.increment({
        kills, assists, deaths, arrowsHit, arrowsTotal,
        woolTouches: playerWoolTouches
      }, {
        where: {
          playerId,
          tournamentId
        }
      });

    } 
    catch(e) {
      console.log(e);
    }

  }
}

module.exports = insertStats;