//Essentially just a list of players' usernames of who registered for a tournament

const db = require("./db");
const { Sequelize } = require("sequelize");

const Player = db.define("player", {
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
}, {
  indexes: [
    { name: "idx_playerName", unique: true, fields: ["username"] },
    { name: "idx_playerUuid", unique: false, fields: ["uuid"]}
  ]
});

module.exports = Player;