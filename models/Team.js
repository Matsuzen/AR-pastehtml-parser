//Table for each team that register for each tournament

const db = require("./db");
const { Sequelize } = require("sequelize");

const Team = db.define("team", {
  //Team can only be present once per tournament
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tournamentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  indexes: [{ name: "idx_team_tournamentId", unique: false, fields: ["tournamentId"] }]
});

module.exports = Team;