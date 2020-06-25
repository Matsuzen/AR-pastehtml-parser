//Essentially just a list of players' usernames of who registered for a tournament

const db = require("./db");
const { Sequelize } = require("sequelize");

const Player = db.define("player", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
}, {
  indexes: [{ name: "idx_playerName", unique: true, fields: ["username"] }]
});

module.exports = Player;