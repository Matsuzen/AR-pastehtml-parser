//Table for each team that register for each tournament

const { Sequelize } = require("sequelize");

const Team = Sequelize.define("team", {
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
  indexes: [{ name: "idx_tournamentId", unique: false, fields: ["tournamentId"] }]
});

module.exports = Team;