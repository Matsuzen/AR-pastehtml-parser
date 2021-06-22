const cheerio = require("cheerio");
const axios = require("axios");
//Limit concurrency to prevent timeouts if doing a lot of requests
const { ConcurrencyManager } = require("axios-concurrency");

const manager = ConcurrencyManager(axios, 3);

const https = require("https");

axios.defaults.timeout = 60000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });
axios.defaults.headers = {'Content-Type':'application/xml'};

const fs = require("fs");
const parseMatchDetails = require("./parseMatchDetails");
const parseTeams = require("./parseTeams");
const parseLog = require("./parseLog");
const parseStats = require("./parseStats");

const Match = require("../models/Match");

async function parseHtml(url) {

  //Check if the match already exists
  const splitUrl = url.split("/");
  const pasteName = splitUrl[splitUrl.length - 1].replace(".html", "");

  const existingMatch = await Match.findOne({ where: {
    pasteName
  },
    raw: true
  });

  if(existingMatch) {
    return {
      err: true,
      message: `Match (${pasteName}) already exists`
    }
  }

  let pageHtml;

  //Get the remote pastehtml with the url, otherwise the local one
  //for local, url is the name of the pastehtml in directory
  if(/^(http)/i.test(url)) {
    try {
      const res = await axios.get(url)
      pageHtml = res.data;

    } catch(e) {

      const errorPath = `${__dirname}/../errors`;
      fs.appendFile(
        errorPath, 
        `Pastehtml get request: ${e} - ${url}\n`, 
        err => {
          if(err) throw err;
        }
      )
    }
  } else {
    pageHtml = fs.readFileSync(`${__dirname}/../${url}`);
  }

  //Get the body of the page
  const $ = cheerio.load(pageHtml);

  const matchDetails = parseMatchDetails($);

  matchDetails.pasteName = pasteName;
  matchDetails.pasteUrl = url;

  //Players list needed to find first wool touches
  const { teams, playersList } = parseTeams($);

  const { woolTouches, tntKills } = parseLog($, playersList);

  const playersStats = parseStats($);

  //Object containing different parts of the parse html
  const formatedPasteHtml = {
    matchDetails,
    teams,
    woolTouches,
    tntKills,
    playersStats
  }

  console.log(formatedPasteHtml);

  return formatedPasteHtml;
}

module.exports = parseHtml;