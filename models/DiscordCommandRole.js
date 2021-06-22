
const db = require("./db");
const { Sequelize } = require("sequelize");

const DiscordCommandRole = db.define("discordCommandRole", {
  //Command IDs -1 are "Super roles" that have access to everything
  commandId: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false
  },
  //Role required to use command
  role: Sequelize.STRING

}, {
  indexes: [
    { name: "idx_commandId", unique: false, fields: ["commandId"] }
  ]
});

module.exports = DiscordCommandRole;