//Read every pastehtml given in pasthtmlsToRead
const fs = require("fs");
const readline = require("readline");

const storePasteInfo = require("./storePasteInfo");
const updateSpreadsheet = require("./updateSpreadsheet");

async function readPastehtmls() {
  const fileStream = fs.createReadStream(__dirname + "/../pastehtmlsToRead");

  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let currentPromise;

  let sheetTournament;

  /* fileStream.on("end", async () => {
    //Wait until the last paste's info are stored before updating the Google sheet
    await currentPromise;
    
    updateSpreadsheet();
  }); */

  lineReader.on("line", line => {
    //Line starting by # are comments
    if(line[0] === "#") return;

    const splitLine = line.split(" ");

    const url = splitLine[0];

    const tournamentName = splitLine.slice(1).join(" ");

    sheetTournament = tournamentName;
    
    //Store the relevant info for each pastehtml
    currentPromise = storePasteInfo(url, tournamentName);

  });

}

module.exports = readPastehtmls;