//Read every pastehtml given in pasthtmlsToRead
const fs = require("fs");
const readline = require("readline");

const storePasteInfo = require("./storePasteInfo");

async function readPastehtmls() {
  const fileStream = fs.createReadStream(__dirname + "/../pastehtmlsToRead");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on("line", function(line) {
    //Line starting by # are comments
    if(line[0] === "#") return;

    const [ url, tournamentName ] = line.split(" ");

    //Store the relevant info for each pastehtml
    storePasteInfo(url, tournamentName);
  });
}

module.exports = readPastehtmls;