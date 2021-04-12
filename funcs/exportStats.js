const fs = require("fs");
const { QueryTypes } = require("sequelize");
const db = require("../models/db");
const Tournament = require("../models/Tournament");

//Export every player stats for a given tournament
async function exportStats(orderBy = "kills", tournamentName, page) {

  const orders = {
    kills: true,
    assists: true,
    deaths: true,
    arrowsHit: true,
    arrowsTotal: true,
    accuracy: true,
    woolTouches: true
  }

  const error = {
    err: true
  }

  //Invalid order parameter
  if(!orders[orderBy]) {
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
    ps.kills, ps.assists, ps.deaths, ps.arrowsHit, ps.arrowsTotal, ps.arrowsHit * 100 /ps.arrowsTotal AS accuracy, ps.woolTouches,
    (SELECT COUNT(ms.id) FROM matchStats AS ms WHERE ms.playerId = p.id) AS matchCount
    FROM playerStats as ps, players as p, tournaments as t
    WHERE ps.playerId = p.id
    AND ps.tournamentId = t.id
    AND t.name = ?
    ORDER BY ps.${orderBy} DESC`;

  //Append limit to query
  if(page) {
    const lowerLimit = (page - 1) * 20;
    const upperLimit = page * 20;

    statsQuery += ` LIMIT ${lowerLimit}, ${upperLimit}`;
  }

  let errMessage; 

  const statsResult = await db.query(statsQuery, 
    { 
      replacements: [tournamentName],
      type: QueryTypes.SELECT 
    }
  )
  .catch(e => {
    errMessage = `Something wrong happened while fetching stats from the db: ${e}`;
  });

  return statsResult;

  /* const fileContent = errMessage || JSON.stringify(statsResult, null, "\t");

  fs.writeFileSync("../playersStats.json", fileContent); */

}

module.exports = exportStats;