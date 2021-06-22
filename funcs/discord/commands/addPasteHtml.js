
const storePasteInfo = require("../../storePasteInfo");
const checkPerms = require("../checkPerms");

const defaults = {
  name: "Add Pastehtml",
  command: "addpaste",
  params: "(pastehtml url) [tournament name]"
};

async function addPasteHtml(message, params, command) {

  let [ urls, ...tournamentName ] = params;

  const perms = await checkPerms(message, command);

  if(perms.err) {
    return perms.message;
  }

  //Tournament name is the reminder of the message
  tournamentName = tournamentName.join(" ");

  const urlsArray = urls.split(",");

  let failed = 0;

  //String for each error that happened
  let failedErrs = "";
  
  const promises = urlsArray.map(pasteHtmlUrl => {
    //Remove new lines and spaces from user's message
    pasteHtmlUrl = pasteHtmlUrl.replace(/[\(\n) ]/, "");

    return storePasteInfo(pasteHtmlUrl, tournamentName);
  })

  for await(const res of promises) {
    if(res.err) {
      failed++;
      failedErrs += `(${res.message})\n`;
    }
  }

  if(failed) {
    return `Could not store ${failed} pastehtmls:
    ${failedErrs}`;
  }

  return "Succesfully stored all pastehtmls";
}

module.exports = {
  defaults,
  func: addPasteHtml
}
