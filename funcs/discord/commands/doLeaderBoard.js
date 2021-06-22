//Make an embed that displays 20 player stats at a time

const exportStats = require("../../exportStats");

const defaults = {
  name: "Do Leaderboard",
  command: "lb",
  params: "[sort by] [tournament name] [page]"
};

async function doLeaderBoard(message, params) {

  const [ sortBy = "Kills", tournamentName = "Ranked", page = 1 ] = params;

  const stats = await exportStats(sortBy, tournamentName, page);
  
  if(stats.err) {
    return stats.message;
  }

  const embedOptions = {
    title: `${tournamentName} stats`,
    description: "",
    fields: []
  }
  
  const headers = ["Kills", "Assists", "Deaths", "Arrows (acc%)", "Touches", "Matches"];

  //Insert each stat listed as headers
  headers.forEach((statName, i) => {

    embedOptions.description += `${statName}`

    if(i < headers.length - 1) {
      embedOptions.description += " - ";
    } else {
      embedOptions.description += "\n";
    }
  })

  const startingIndex = (page - 1) * 20;

  stats.data.forEach(({ username, kills, assists, deaths, arrowsHit, arrowsTotal, accuracy, woolTouches, matches }, i) => {
    embedOptions.fields.push({
      name: "\u200b",
      value: `${startingIndex + i + 1}: ${username} - ${kills} - ${assists} - ${deaths} - ${arrowsHit} / ${arrowsTotal} (${accuracy}%) - ${woolTouches} - ${matches} \n`
    })
  });

  return { embed: embedOptions };
}

module.exports = {
  defaults,
  func: doLeaderBoard
};
