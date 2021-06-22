//Add an allowed role for a command

const checkPerms = require("../checkPerms");
const manageCommandRole = require("../../manageCommandRole");

const defaults = {
  name: "Add Command Role",
  command: "addcommandrole",
  params: "(command) (role)"
}

async function addCommandRole(message, params, command) {

  const perms = await checkPerms(message, command);

  if(perms.err) {
    return perms.message;
  }

  const [ commandName, ...role ] = params;

  //Use the "findOrCreate" sequelize method
  const manageRoleRes = await manageCommandRole("findOrCreate", commandName, role.join(" "));

  return manageRoleRes.message;

}

module.exports = {
  defaults,
  func: addCommandRole
}