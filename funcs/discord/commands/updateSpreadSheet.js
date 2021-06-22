const updateSpreadSheet = require("../../../funcs/updateSpreadsheet");
const checkPerms = require("../checkPerms");

const defaults = {
  name: "Update Spreadsheet",
  command: "updatespreadsheet",
  params: "(spreadsheet id) (tournament name)"
}

async function updateSpreadSheetBot(message, params, command) {

  const perms = await checkPerms(message, command);

  if(perms.err) {
    return perms.message;
  }

  const [ sheetId, ...tournamentName ] = params;
  const sheetRes = await updateSpreadSheet(sheetId, tournamentName.join(" "));

  return sheetRes.message; 

}

module.exports = {
  defaults,
  func: updateSpreadSheetBot
}