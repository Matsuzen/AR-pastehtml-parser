const { Sequelize } = require("sequelize");

const Match = Sequelize.define("match", {
  tournamentId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  matchName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mapName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matchDate: Sequelize.DATETIME,
  //There may not be a winner for a given match
  winners: {
    type: Sequelize.STRING,
    allowNull: true
  },
  team1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  team2: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  indexes: [
    { name: "idx_tournamentId", unique: false, fields: ["tournamentId"] }, 
    { name: "idx_mapName", unique: false, fields: ["mapName"] }, 
    { name: "idx_team1", unique: false, fields: ["team1"] },
    { name: "idx_team2", unique: false, fields: ["team2"] },
  ]
});

module.exports = Match;