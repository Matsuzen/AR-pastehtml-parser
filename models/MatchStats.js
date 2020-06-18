//Stats for a player for a given match

const { Sequelize } = require("sequelize");

const MatchStats = Sequelize.define("matchStats", {
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  matchId: {
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
    { name: "idx_matchStats_playerId", unique: false, fields: ["playerId"] },
    { name: "idx_matchStats_teamId", unique: false, fields: ["teamId"] }
  ]
});

module.exports = MatchStats;