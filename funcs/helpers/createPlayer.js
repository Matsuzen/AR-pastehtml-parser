const Player = require("../../models/Player");

//Insert a row in the players table
async function createPlayer(username) {
  const newPlayer = await Player.create({ username })
  .catch(e => e);

  return newPlayer;
}

module.exports = createPlayer;