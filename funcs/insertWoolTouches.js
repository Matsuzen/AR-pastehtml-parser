const Player = require("../models/Player");
const WoolTouch = require("../models/WoolTouch");

async function insertWoolTouches(woolTouches, matchId) {
  const newWoolTouches = [];

  for(const woolCarrier in woolTouches) {

    //Find the player ID of the carrier
    const player = await Player.findOne({ where: { username: woolCarrier } })
    .catch(e => {
      console.log(e);
    }); 

    const playerId = player && player.dataValues.id;

    const playerWoolTouches = woolTouches[woolCarrier];

    playerWoolTouches.forEach(async ({ woolColor, timestamp }) => {
      const newWoolTouch = await WoolTouch.create({
        matchId,
        playerId,
        woolColor,
        timestamp
      })
      .catch(e => {
        console.log(e);
      })

      newWoolTouches.push(newWoolTouch);
    })
  }

  return newWoolTouches;
}

module.exports = insertWoolTouches;