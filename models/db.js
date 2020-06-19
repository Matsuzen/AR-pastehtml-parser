const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite"
});

db.sync();

module.exports = db;