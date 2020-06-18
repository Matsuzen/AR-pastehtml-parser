const { Sequelize } = require("sequelize");

const Tournament = Sequelize.define("tournament", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  dateStart: Sequelize.DATE,
  dateEnd: Sequelize.DATE
});

module.exports = Tournament;