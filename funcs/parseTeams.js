function parseTeams($) {
  const teamsSection = $("#match-details div:nth-child(2)").html();

  const teamNames = [];
  const teamMembers = {};

  //Find the team names
  $(teamsSection).find("h4[class*='team-']").each(function(i) {
    const teamName = $(this).text();

    //Add team name & initialize array for each teams that will contain team members
    teamNames.push(teamName);
    teamMembers[teamName] = [];
  });

  //Find members for each team
  teamNames.forEach((teamName) => {

    //No spaces and lower case for the attribute selector
    const teamNameSelector = teamName.replace(/ /g, "").toLowerCase();

    $(teamsSection).find(`span[class*='player'][class*='team-${teamNameSelector}']`).each(function(i) {
      const teamMember = $(this).text();
      teamMembers[teamName].push(teamMember);
    }); 
  });

  return teamMembers;
}

module.exports = parseTeams;