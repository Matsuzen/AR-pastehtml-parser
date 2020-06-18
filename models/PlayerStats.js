//Total Player stats for a player of ONE tournament

const { Sequelize } = require("sequelize");

const PlayerStats = Sequelize.define("playerStats", {
  //Player ID linked to the name in "Player"
  //Can be present only ONCE per tournament
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tournamentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  teamId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  kills: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  assists: Sequelize.INTEGER,
  arrowHits: Sequelize.INTEGER,
  //Total bow shots fired
  totalHits: Sequelize.INTEGER,
  woolTouches: Sequelize.INTEGER
}, {
  indexes: [
    { name: "idx_playerId", unique: false, fields: ["playerId"] },
    { name: "idx_tournamentId", unique: false, fields: ["tournamentId"] },
    { name: "idx_teamId", unique: false, fields: ["teamId"] }
  ]
});

module.exports = PlayerStats;
