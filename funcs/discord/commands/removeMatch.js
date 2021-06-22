const removeMatch = require("../../removeMatch");
const checkPerms = require("../checkPerms");

const defaults = {
  name: "Remove Match",
  command: "removematch",
  params: "[match id | pastehtml url | latest]"
};

async function removeMatchBot(message, params, command) {

  const perms = await checkPerms(message, command);

  if(perms.err) {
    return perms.message;
  }

  const [ matchFinder ] = params;
  const removedRes = await removeMatch(matchFinder);

  return removedRes.message;
}

module.exports = {
  defaults,
  func: removeMatchBot
};