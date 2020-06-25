//Each player registered for individual tournaments

const db = require("./db");
const { Sequelize } = require("sequelize");

const PlayerRegistration = db.define("playerRegistration", {
  //Player ID can only be there once per tournament ID
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tournamentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  teamId: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  indexes: [{ name: "idx_reg_tournamentId", unique: false, fields: ["tournamentId"] }]
});

module.exports = PlayerRegistration;