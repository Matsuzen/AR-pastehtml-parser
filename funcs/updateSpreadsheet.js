const { GoogleSpreadsheet } = require("google-spreadsheet");
const { QueryTypes } = require("sequelize");
const db = require("../models/db");

const creds = require("../credentials");

async function updateSpreadsheet(sheetId, tournamentName) {

  try {

    const doc = new GoogleSpreadsheet(sheetId);
    
    await doc.useServiceAccountAuth(creds);
    
    await doc.loadInfo();
    
    const statsSheet = doc.sheetsByIndex[1];
    
    await statsSheet.loadCells();
  
    const statsQuery = `SELECT p.username, 
      CAST(SUM(ms.kills) AS UNSIGNED) kills, CAST(SUM(ms.tntKills) AS UNSIGNED) AS tntKills, CAST(SUM(ms.assists) AS UNSIGNED) assists, CAST(SUM(ms.deaths) AS UNSIGNED) deaths, CAST(SUM(ms.arrowsHit) AS UNSIGNED) arrowsHit, CAST(SUM(ms.arrowsTotal) AS UNSIGNED) arrowsTotal, 
      CAST((CAST(SUM(ms.arrowsHit) AS UNSIGNED) * 100 / CAST(SUM(ms.arrowsTotal) AS UNSIGNED)) AS UNSIGNED) accuracy, 
      CAST(SUM(ms.woolTouches) AS UNSIGNED) woolTouches,
      COUNT(ms.id) matches
      FROM players AS p, matches AS m, matchStats AS ms, tournaments AS t
      WHERE ms.playerId = p.id
      AND ms.matchId = m.id
      AND m.tournamentId = t.id
      AND t.name = ?
      GROUP BY p.username
      ORDER BY kills DESC`;
    
    const statsResult = await db.query(statsQuery, {
      replacements: [tournamentName],
      type: QueryTypes.SELECT 
    });
    
    //Row 0 is headers, begin at row 2
    let row = 2;
  
    statsResult.forEach(playerStats => {
  
      //Set the user's avatar
      const avatarCell = statsSheet.getCell(row, 0);
      avatarCell.formula = `=IMAGE("https://cravatar.eu/avatar/${playerStats.username}")`;
      
      let col = 1;
  
      for(const stat in playerStats) {
  
        const cell = statsSheet.getCell(row, col);
  
        let cellValue = playerStats[stat];
  
        if(cellValue === undefined || cellValue === null) cellValue = 0;
  
        cell.value = cellValue;
  
        col++;
        
      }
  
      row++;
      
    });
  
    await statsSheet.saveUpdatedCells();  

    return {
      message: "Succesfully updated spreadsheet"
    }
    
  }
  catch(e) {
    return {
      err: true,
      message: `Could not update spreadsheet: ${e}`
    }
  }
}

module.exports = updateSpreadsheet;