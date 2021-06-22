const db = require("../../models/db");
const { QueryTypes } = require("sequelize");

async function checkPerms(message, command) {

  const rolesQuery = `SELECT role FROM DiscordCommands AS c, DiscordCommandRoles AS cr
    WHERE c.command = ?
    AND cr.commandId = c.id OR cr.commandId = -1`;

  const rolesRes = await db.query(rolesQuery, {
    replacements: [command],
    type: QueryTypes.SELECT
  })

  const allowedRoles = {};
  
  rolesRes.forEach(({ role }) => allowedRoles[role] = true);

  const hasPermission = message.member.roles.cache.find(r => {
    if(r) return allowedRoles[r.name];
  });

  const error = {
    err: true
  }

  //Craft message response with required Discord roles to perform command
  if(!hasPermission) {

    let requiredRoles = "";

    const rolesArr = Object.keys(allowedRoles);

    rolesArr.forEach((role, i) => {
      requiredRoles += role;

      if(i !== rolesArr.length - 1) {
        requiredRoles += ", ";
      }
    })

    error.message = `Role needed for this command: ${requiredRoles}`;
    return error;
  }

  return {
    message: "User has permission"
  }
}

module.exports = checkPerms;