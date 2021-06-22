const fs = require("fs");
const { QueryTypes } = require("sequelize");
const db = require("../models/db");
const Tournament = require("../models/Tournament");

//Export every player stats for a given tournament
async function exportStats(orderBy = "kills", tournamentName, page) {

  const orders = {
    kills: "kills",
    tntkills: "TntKills",
    assists: "assists",
    deaths: "deaths",
    arrowshit: "arrowsHit",
    arrowstotal: "arrowsTotal",
    accuracy: "accuracy",
    wooltouches: "woolTouches",
    matches: "matches"
  }

  const error = {
    err: true
  }

  const order = orders[orderBy.toLowerCase()];

  //Invalid order parameter
  if(!order) {
    error.message = "Invalid order specified";
    return error;
  }

  //Find latest tournament
  if(!tournamentName) {
    const latestTourney = await Tournament.findOne({ 
      where: {}, 
      order: [
        ["createdAt", "DESC"]
      ],
      raw: true 
    })
    tournamentName = latestTourney.name;
  }

  //Find the stats for players of given tournament
  let statsQuery = `SELECT p.username, 
    SUM(ms.kills) kills, SUM(ms.tntKills), SUM(ms.assists) assists, SUM(ms.deaths) deaths, SUM(ms.arrowsHit) arrowsHit, SUM(ms.arrowsTotal) arrowsTotal, 
    CAST((SUM(ms.arrowsHit) * 100 / SUM(ms.arrowsTotal)) AS UNSIGNED) accuracy, 
    SUM(ms.woolTouches) woolTouches,
    COUNT(ms.id) matches
    FROM players AS p, matches AS m, matchStats AS ms, tournaments AS t
    WHERE ms.playerId = p.id
    AND ms.matchId = m.id
    AND m.tournamentId = t.id
    AND REPLACE(t.name, ' ', '') = REPLACE(?, ' ', '')
    GROUP BY p.username
    ORDER BY ${order} DESC`;

  //Append limit to query
  if(page) {
    page = parseInt(page);

    const offset = (page - 1) * 20;

    statsQuery += ` LIMIT ${offset}, 20`;
  }

  try {
    const statsResult = await db.query(statsQuery, 
      { 
        replacements: [tournamentName],
        type: QueryTypes.SELECT 
      }
    )

    return {
      data: statsResult
    }
  }
  catch(e) {
    return {
      err: true,
      message: `Something wrong happened while fetching stats from the db: ${e}` 
    }
  }

}

module.exports = exportStats;