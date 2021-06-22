//Add an allowed role for a command

const checkPerms = require("../checkPerms");
const manageCommandRole = require("../../manageCommandRole");

const defaults = {
  name: "Remove Command Role",
  command: "removecommandrole",
  params: "[command] [role]"
}

async function removeCommandRole(message, params, command) {

  const perms = await checkPerms(message, command);

  if(perms.err) {
    return perms.message;
  }

  const [ commandName, ...role ] = params;

  //Use the "destroy" sequelize method
  const manageRoleRes = await manageCommandRole("destroy", commandName, role.join(" "));

  return manageRoleRes.message;

}

module.exports = {
  defaults,
  func: removeCommandRole
}