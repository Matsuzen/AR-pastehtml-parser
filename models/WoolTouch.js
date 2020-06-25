//Store a wool touch for a player for a given match

const db = require("./db");
const { Sequelize } = require("sequelize");

const WoolTouch = db.define("woolTouch", {
  matchId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  woolColor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timestamp: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  indexes: [
    { name: "idx_wooltouch_matchId", unique: false, fields: ["matchId"] },
    { name: "idx_wooltouch_playerId", unique: false, fields: ["playerId"] }
  ]
});

module.exports = WoolTouch;