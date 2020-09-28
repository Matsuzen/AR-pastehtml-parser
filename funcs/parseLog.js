//Find wool touches by going through every line of log

function parseLog($, playersList) {
  const woolTouches = {};

  //Validation object to make sure each wool is only touched once per team
  const firstTouches = {};

  $(".transcript-event").each(function() {
    const logMessage = $(this).find(".message").text();
  
    const woolLog = logMessage.match(/([A-Z]+) WOOL/);

    //Line doesn't pertain any wool
    if(!woolLog) return;

    const woolColor = woolLog[1].toLowerCase();

    //Check if the wool was picked up
    const woolTouch = /picked up/.test(logMessage);

    if(!woolTouch) return;

    const woolCarrier = $(this).find(".player").text();
    const carrierTeam = playersList[woolCarrier];

    //Initiate team's object
    if(!firstTouches[carrierTeam]) firstTouches[carrierTeam] = {};

    //Wool has already been first picked up by team
    if(firstTouches[carrierTeam][woolColor]) return;

    firstTouches[carrierTeam][woolColor] = woolCarrier;

    //Initite array for wool carrier containing every wool color
    //carried by the player
    if(!woolTouches[woolCarrier]) woolTouches[woolCarrier] = [];

    const logTimestamp = $(this).find(".timestamp").text();

    woolTouches[woolCarrier].push({
      woolColor,
      timestamp: logTimestamp
    });
  });

  return woolTouches;
}

module.exports = parseLog;