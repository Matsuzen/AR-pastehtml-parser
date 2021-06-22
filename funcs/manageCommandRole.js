const DiscordCommand = require("../models/DiscordCommand");
const DiscordCommandRole = require("../models/DiscordCommandRole");

async function manageCommandRole(method, commandName, role) {

  try {

    const allowedMethods = {
      findOrCreate: true,
      destroy: true
    }

    if(!allowedMethods[method]) {
      throw `Given method ${method} can not be used`;
    }
    

    if(!commandName || !role) {
      throw `Parameters are missing (!${commandName} command role)`;
    }

    //Prevent users from changing the Admin role so they cant be locked out from using commands
    if(role === "Admin") {
      throw "Can not change permissions for the Admin role";
    }

    //Check if command exists
    const command = await DiscordCommand.findOne({ where: { command: commandName } });

    if(!command) {
      throw "Command does not exist";
    }

    const { id } = command.dataValues;

    const params = {
      commandId: id,
      role
    }

    //method param (add / delete)
    const methodOptions = {
      findOrCreate: {
        where: params,
        defaults: params
      },
      destroy: {
        where: params
      }
    }

    const options = methodOptions[method];

    const commandRoleRes = await DiscordCommandRole[method](options);

    //No new row created
    if(method === "findOrCreate" && !commandRoleRes[0]._options.isNewRecord) {
      throw `Role ${role} already has access to ${commandName}`;
    }
    //Destroy method returns the number of deleted rows
    else if(method === "destroy" && commandRoleRes === 0) {
      throw `Role ${role} already doesn't have access to ${commandName}`
    }

    const resMessages = {
      findOrCreate: `Succesfully added role "${role}" to ${commandName}`,
      destroy: `Succesfully removed role "${role}" from ${commandName}`
    }

    return {
      message: resMessages[method]
    }

  }
  catch(e) {
    return {
      err: true,
      message: `Could not manage role in command: ${e}`
    }
  }
}

module.exports = manageCommandRole;