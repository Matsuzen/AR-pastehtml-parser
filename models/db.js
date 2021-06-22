const Sequelize = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PW, DB_DIALECT, DB_HOST } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PW, {
  dialect: DB_DIALECT,
  host:  DB_HOST
});

db.sync();

module.exports = db;