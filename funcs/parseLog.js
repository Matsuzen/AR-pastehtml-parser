//Find wool touches by going through every line of log

function parseLog($, playersList) {
  const woolTouches = {};

  //Validation object to make sure each wool is only touched once per team
  const firstTouches = {};

  //Object for tnt kills
  const tntKills = {};

  $(".transcript-event").each(function() {
    const logMessage = $(this).find(".message").text();

    doWoolTouches(logMessage, this);

    doCannonKills(logMessage, this)
    
  });
  
  function doWoolTouches(logMessage, el) {
    const woolLog = logMessage.match(/([A-Z]+) WOOL/);
  
    //Line doesn't pertain any wool
    if(!woolLog) return;
  
    const woolColor = woolLog[1].toLowerCase();
  
    //Check if the wool was picked up
    const woolTouch = /picked up/.test(logMessage);
  
    if(!woolTouch) return;
  
    const woolCarrier = $(el).find(".player").text();
    const carrierTeam = playersList[woolCarrier];
  
    //Initiate team's object
    if(!firstTouches[carrierTeam]) firstTouches[carrierTeam] = {};
  
    //Wool has already been first picked up by team
    if(firstTouches[carrierTeam][woolColor]) return;
  
    firstTouches[carrierTeam][woolColor] = woolCarrier;
  
    //Initite array for wool carrier containing every wool color
    //carried by the player
    if(!woolTouches[woolCarrier]) woolTouches[woolCarrier] = [];
  
    const logTimestamp = $(el).find(".timestamp").text();
  
    woolTouches[woolCarrier].push({
      woolColor,
      timestamp: logTimestamp
    });
  }

  function doCannonKills(logMessage, el) {
    //x was blown up by y is the log message
    const tntKill = logMessage.match(/blown up by ([A-Za-z0-9_-]+)/);

    //Not a cannon kill (ignore creepers)
    if(!tntKill || tntKill[1] === "Creeper") return;

    //y is the killer (Second player in the log message)
    const killer = tntKill[1];

    if(tntKills[killer] === undefined) tntKills[killer] = 0;

    tntKills[killer]++;

  }

  return {
    woolTouches,
    tntKills
  }
}

module.exports = parseLog;