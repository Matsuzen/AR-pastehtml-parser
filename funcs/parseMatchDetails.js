function parseMatchDetails($) {
  //Array for details' names to match the db
  const details = ["matchName", "mapName", "matchDate", "matchLength", "winners", "referees", "streamers"];

  //Object containing the parsed details
  const formatedDetails = {};

  $(`#match-details div tr`).each(function(i) {
    const detailName = details[i];
    const detail = $(this).find("td").text();

    formatedDetails[detailName] = detail;
  });
  
  return formatedDetails;
}

module.exports = parseMatchDetails;