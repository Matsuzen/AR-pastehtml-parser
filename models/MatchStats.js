//Stats for a player for a given match

const db = require("./db");
const { Sequelize } = require("sequelize");

const MatchStats = db.define("matchStats", {
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  matchId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  kills: Sequelize.INTEGER,
  tntKills: Sequelize.INTEGER,
  assists: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  arrowsHit: Sequelize.INTEGER,
  //Total bow shots fired
  arrowsTotal: Sequelize.INTEGER,
  woolTouches: Sequelize.INTEGER
}, {
  indexes: [
    { name: "idx_matchStats_playerId", unique: false, fields: ["playerId"] },
    { name: "idx_matchStats_matchId", unique: false, fields: ["matchId"] }
  ]
});

module.exports = MatchStats;