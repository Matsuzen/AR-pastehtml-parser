const { GoogleSpreadsheet }  = require("google-spreadsheet");
const { QueryTypes } = require("sequelize");
const db = require("../models/db");

const creds = require("../client_secret");

async function updateSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  
  await doc.useServiceAccountAuth(creds);
  
  await doc.loadInfo();
  
  const statsSheet = doc.sheetsByIndex[1];
  
  await statsSheet.loadCells();

  const statsQuery = `SELECT p.username, 
    ps.kills, ps.assists, ps.deaths, ps.arrowsHit, ps.arrowsTotal, ps.arrowsHit * 100 /ps.arrowsTotal AS accuracy, ps.woolTouches,
    (SELECT COUNT(ms.id) FROM matchStats AS ms WHERE ms.playerId = p.id) AS matchCount
    FROM playerStats AS ps, players AS p
    WHERE ps.playerId = p.id 
    ORDER BY ps.kills DESC`;
  
  const statsResult = await db.query(statsQuery, { type: QueryTypes.SELECT });
  
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
}

module.exports = updateSpreadsheet;