const db = require("./db");
const { Sequelize } = require("sequelize");

const Tournament = db.define("tournament", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  dateStart: Sequelize.DATE,
  dateEnd: Sequelize.DATE
});

module.exports = Tournament;