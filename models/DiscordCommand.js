

const db = require("./db");
const { Sequelize } = require("sequelize");

const DiscordCommand = db.define("discordCommand", {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  command: {
    type: Sequelize.STRING,
    unique: true
  },
  params: {
    type: Sequelize.STRING,
    allowNull: true
  },
  //Function's file associated with the command name
  fileName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  }
}, {
  indexes: [
    { name: "idx_command", unique: true, fields: ["command"] },
    { name: "idx_name", unique: true, fields: ["name"] },
  ]
});

module.exports = DiscordCommand;