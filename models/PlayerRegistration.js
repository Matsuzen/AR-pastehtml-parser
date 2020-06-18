//Each player registered for individual tournaments

const { Sequelize } = require("sequelize");

const PlayerRegistration = Sequelize.define("playerRegistration", {
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
  indexes: [{ name: "idx_tournamentId", unique: false, fields: ["tournamentId"] }]
});

module.exports = PlayerRegistration;