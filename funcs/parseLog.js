//Find wool touches by going through every line of log

function parseLog($) {
  const woolTouches = {};

  $(".transcript-event .message").each(function(i) {
    const logMessage = $(this).text();

    const woolTouch = /is carrying the first/.test(logMessage);

    //No wool touch, check next line
    if(!woolTouch) return;

    const woolCarrier = $(this).find(".player").text();

    //Initite array for wool carrier containing every wool color
    //carried by the player
    if(!woolTouches[woolCarrier]) woolTouches[woolCarrier] = [];

    //Find color of wool
    const woolColor = $(this).find(".block").text().split(" ")[0].toLowerCase();

    woolTouches[woolCarrier].push(woolColor);
  });

  return woolTouches;
}

module.exports = parseLog;