const fs = require("fs");
const { QueryTypes } = require("sequelize");
const db = require("../models/db");

//Export every player stats for a given tournament
async function exportStats(tournamentName) {

  //Find the stats for players of given tournament
  const statsQuery = `SELECT p.username, 
    ps.kills, ps.assists, ps.deaths, ps.arrowsHit, ps.arrowsTotal, ps.arrowsHit * 100 /ps.arrowsTotal AS accuracy, ps.woolTouches,
    (SELECT COUNT(ms.id) FROM matchStats AS ms WHERE ms.playerId = p.id) AS matchCount
    FROM playerStats as ps, players as p, tournaments as t
    WHERE ps.playerId = p.id
    AND ps.tournamentId = t.id
    AND t.name = ?
    ORDER BY ps.kills DESC`;

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

  const fileContent = errMessage || JSON.stringify(statsResult, null, "\t");

  fs.writeFileSync("../playersStats.json", fileContent);

}

module.exports = exportStats;