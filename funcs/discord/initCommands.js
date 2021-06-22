const fs = require("fs");
const { QueryTypes } = require("sequelize");

const db = require("../../models/db");
const DiscordCommand = require("../../models/DiscordCommand");
const DiscordCommandRole = require("../../models/DiscordCommandRole");

async function initCommands() {
  await storeDefaults();

  const storedCommands = DiscordCommand.findAll({
    raw: true 
  });

  //commandId = -1 are roles that have access to every command
  const rolesQuery = `SELECT c.name, c.command, cr.role FROM discordCommands AS c, discordCommandRoles AS cr
    WHERE cr.commandId = c.id`;
  
  const storedRoles = db.query(rolesQuery, {
    type: QueryTypes.SELECT
  })

  const commandRes = await Promise.all([storedCommands, storedRoles]);

  const commands = {};
  const commandRoles = {};

  //Commands
  commandRes[0].forEach(storedCommand => {
    const { command, fileName } = storedCommand;

    //Wild Card has no actual command
    if(command === "*") return;
    
    if(command != "!") {
      commands[command] = require(`./commands/${fileName}`).func;
      return;
    }

    commands.Prefix = command;

  });

  //Roles for each command
  commandRes[1].forEach(storedRole => {
    let { command, role } = storedRole;

    if(!role) return;

    if(!commandRoles[command]) {
      commandRoles[command] = {};
    }

    commandRoles[command][role] = true; 
  });

  return {
    commands,
    commandRoles
  }
}

//Store default function commands when initiating for the first time
async function storeDefaults() {
  /* const defaultsExist = await DiscordCommand.findOne({ raw: true });

  if(defaultsExist) return; */

  const prefixOptions = {
    name: "Prefix",
    command: "!"
  }
  const prefix = DiscordCommand.findOrCreate({
    where: prefixOptions,
    defaults: prefixOptions
  });
  
  const wildCardOptions = {
    id: -1,
    name: "Wild Card",
    command: "*"
  }
  const wildCard = DiscordCommand.findOrCreate({
    where: wildCardOptions,
    defaults: wildCardOptions
  });

  const adminRoleOptions = {
    commandId: -1,
    role: "Admin"
  }
  const adminRole = DiscordCommandRole.findOrCreate({
    where: adminRoleOptions,
    defaults: adminRoleOptions
  });

  const promises = [prefix, wildCard, adminRole];

  fs.readdirSync(`${__dirname}/commands`)
  .forEach(fileName => {
    const { defaults } = require(`./commands/${fileName}`);

    defaults.fileName = fileName;

    promises.push(DiscordCommand.findOrCreate({
      where: { fileName },
      defaults
    }));
  });

  try {
    await Promise.all(promises);
  }
  catch(e) {
    console.log(e);
  }
}

module.exports = initCommands;