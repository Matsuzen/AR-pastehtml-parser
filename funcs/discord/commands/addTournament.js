const addTournament = require("../../addTournament");
const checkPerms = require("../checkPerms");

const defaults = {
  name: "Add Tournament",
  command: "addtournament",
  params: "(tournament name)"
};

async function addTournamentBot(message, params, command) {
  const tournamentName = params.join(" ");

  const perms = await checkPerms(message, command);
  if(perms.err) {
    return perms.message;
  }

  const newTournament = await addTournament(tournamentName);

  return newTournament.message;
}

module.exports = {
  defaults,
  func: addTournamentBot
};
