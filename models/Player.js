//Essentially just a list of players' usernames of who registered for a tournament

const { Sequelize } = require("sequelize");

const Player = Sequelize.define("player", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
}, {
  indexes: [{ name: "idx_playerName", unique: true, fields: ["name"] }]
});

module.exports = Player;