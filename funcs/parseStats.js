//Make the player stats table a javascript object
function parseStats($) {
  const statsTable = $("#ar_content .table-bordered:nth-of-type(2)");

  const playersStats = {};

  $(statsTable).find("tbody tr").each(function(i) {
    const rank = parseInt($(this).find("td:nth-child(1)").text());
    
    //Find player's name with the "player" class
    const username = $(this).find("td:nth-child(2) .player").text();

    //Formated "K (A)" in paste html
    const killsAssists = $(this).find("td:nth-child(3)").text().match(/(\d+) \((\d+)\)/);
   
    const kills = parseInt(killsAssists[1]);
    const assists = parseInt(killsAssists[2]);

    const deaths = parseInt($(this).find("td:nth-child(4)").text());
    const accuracy = $(this).find("td:nth-child(5)").text();

    //Formated "X% (N/M)" in paste html
    const arrowsShot = accuracy.match(/\((\d+)\/(\d+)\)/);
    const arrowsHit = parseInt(arrowsShot[1]);
    const arrowsTotal = parseInt(arrowsShot[2]);

    //Object containing each stat for one player
    const playerStats = {
      rank, 
      kills,
      assists,
      deaths,
      arrowsHit,
      arrowsTotal
    }
    
    playersStats[username] = playerStats;

  });

  return playersStats;
}

module.exports = parseStats;