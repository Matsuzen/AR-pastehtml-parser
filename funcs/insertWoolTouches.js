const Player = require("../models/Player");
const WoolTouch = require("../models/WoolTouch");

const fs = require("fs");

async function insertWoolTouches(woolTouches, matchId) {
  const newWoolTouches = [];

  for(const woolCarrier in woolTouches) {
    
    console.log(woolCarrier)

    if(!woolCarrier) continue;

    //Find the player ID of the carrier
    const player = await Player.findOne({ where: { username: woolCarrier } })
    .catch(e => console.log(e));

    const playerId = player && player.dataValues.id;

    if(!playerId) continue;

    const playerWoolTouches = woolTouches[woolCarrier];

    await Promise.all(playerWoolTouches.map(async ({ woolColor, timestamp }) => {
      const newWoolTouch = await WoolTouch.create({
        matchId,
        playerId,
        woolColor,
        timestamp
      })
      .catch(e => {
        fs.appendFile(`${__dirname}/../errors`, `${e}\n`, err => {
          if(err) throw err;
        })
        console.log(e);
      })

      newWoolTouches.push(newWoolTouch.dataValues);
    }))
  }

  return newWoolTouches;
}

module.exports = insertWoolTouches;