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
  indexes: [
    { name: "idx_reg_tournamentId", unique: false, fields: ["tournamentId"] },
    { name: "idx_reg_playerId", unique: false, fields: ["playerId"] },
    { name: "idx_reg_teamId", unique: false, fields: ["teamId"] },
    { name: "idx_reg_playerId_tournamentId", unique: true, fields: ["playerId", "tournamentId"] }
  ]
});

module.exports = PlayerRegistration;