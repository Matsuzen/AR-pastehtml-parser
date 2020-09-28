//Total Player stats for a player of ONE tournament

const db = require("./db");
const { Sequelize } = require("sequelize");

const PlayerStats = db.define("playerStats", {
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
  kills: Sequelize.INTEGER,
  assists: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  arrowsHit: Sequelize.INTEGER,
  //Total bow shots fired
  arrowsTotal: Sequelize.INTEGER,
  woolTouches: Sequelize.INTEGER
}, {
  indexes: [
    { name: "idx_stats_playerId", unique: false, fields: ["playerId"] },
    { name: "idx_stats_tournamentId", unique: false, fields: ["tournamentId"] },
    { name: "idx_stats_playerId_tournamentId", unique: true, fields: ["playerId", "tournamentId"] }
  ]
});

module.exports = PlayerStats;
