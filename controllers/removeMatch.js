const Match = require("../models/Match");
const MatchStats = require("../models/MatchStats");
const PlayerStats = require("../models/PlayerStats");
const WoolTouch = require("../models/WoolTouch");
const Tournament = require("../models/Tournament");

//Delete match info and match stats for given id
async function removeMatch(req, res) {
  const { matchId, tournamentName } = req.body;

  const error = {
    err: true
  }

  const deletedMatch = await Match.destroy({ where: { matchId } })
  .catch(err => {
    error.msg = `Could not delete given match: ${err}`;
    res.send(error);
  });

  const tournament = await Tournament.findOne({ where: { name: tournamentName }, raw: true })
  
  if(!tournament) {
    error.msg = "Could not find tournament ID with given name";
    res.send(error);
  }

  //Select every match stats for given match id
  const matchStats = await MatchStats.findAll({ where: { matchId }, raw: true })

  //Decrement PlayerStats for every player involved in the match
  matchStats.forEach(async player => {
    const { playerId, kills, assists, deaths, arrowsHit, arrowsTotal, woolTouches } = player;
    await PlayerStats.decrement({
      kills, assists, deaths, arrowsHit, arrowsTotal, woolTouches
    }, {
      where: { playerId, tournamentId: tournament.id }
    })
    .catch(err => {
      error.msg = `Could not decrement stats for given player & tourney IDs`;
      res.send(error);
    });
  })

  const deletedStats = await MatchStats.destroy({ where: { matchId } })
  .catch(err => {
    error.msg = "Could not delete match stats for given match ID";
    res.send(error);
  });

  //delete wool touches
  const deletedWools = await WoolTouch.destroy({ where: { matchId } })
  .catch(err => {
    error.msg = "Could not delete wool touches for given match ID";
    res.send(error);
  });
}

module.exports = removeMatch;