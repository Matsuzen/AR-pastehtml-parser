const Player = require("../models/Player");
const WoolTouch = require("../models/WoolTouch");

async function insertWoolTouches(woolTouches, matchId) {
  const newWoolTouches = [];
  console.log(woolTouches);

  for(const woolCarrier in woolTouches) {
    console.log(woolCarrier);

    //Find the player ID of the carrier
    const player = await Player.findOne({ where: { username: woolCarrier } })
    .catch(e => {
      console.log(e);
    }); 

    const playerId = player.dataValues.id;

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

      console.log(newWoolTouch.dataValues);
      newWoolTouches.push(newWoolTouch);
    })
  }

  return newWoolTouches;
}

module.exports = insertWoolTouches;