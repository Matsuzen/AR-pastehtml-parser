const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const parseMatchDetails = require("./parseMatchDetails");
const parseTeams = require("./parseTeams");
const parseLog = require("./parseLog");
const parseStats = require("./parseStats");

async function parseHtml(url) {
  let pageHtml;

  //Get the remote pastehtml with the url, otherwise the local one
  if(/^(http)/i.test(url)) {
    const res = await axios.get(url)
    pageHtml = res.data;
  } else {
    pageHtml = fs.readFileSync(`${__dirname}/../${url}`);
  }

  //Get the body of the page
  const $ = cheerio.load(pageHtml);

  const matchDetails = parseMatchDetails($);

  //Players list needed to find first wool touches
  const { teams, playersList } = parseTeams($);

  const woolTouches = parseLog($, playersList);

  const playersStats = parseStats($);

  //Object containing different parts of the parse html
  const formatedPasteHtml = {
    matchDetails,
    teams,
    woolTouches,
    playersStats
  }

  return formatedPasteHtml;
}

module.exports = parseHtml;