const cheerio = require("cheerio");
const axios = require("axios");
const parseMatchDetails = require("./parseMatchDetails");
const parseTeams = require("./parseTeams");
const parseLog = require("./parseLog");
const parseStats = require("./parseStats");

async function parseHtml(url) {
  const res = await axios.get(url);

  //Get the body of the page
  const $ = cheerio.load(res.data);

  const matchDetails = parseMatchDetails($);

  const teamMembers = parseTeams($);

  const woolTouches = parseLog($);

  const playerStats = parseStats($);

  //Object containing different parts of the parse html
  const pasteHtml = {
    matchDetails,
    teamMembers,
    woolTouches,
    playerStats
  }

  console.log(pasteHtml)
}

module.exports = parseHtml;