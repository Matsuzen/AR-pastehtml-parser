//Register a team for a given tournament

const Team = require("../models/Team");
const Tournament = require("../models/Tournament");
const Player = require("../models/Player");
const PlayerRegistration = require("../models/PlayerRegistration");

const createPlayer = require("../funcs/helpers/createPlayer");

async function addTeam(req, res) {
  const { teamName, teamMembers, tournamentName } = req.body;

  const error = {
    err: true
  }

  //Find tournament id with the given name
  const tournamentRes = await Tournament.findOne({
    where: {
      name: tournamentName
    }
  })
  .catch(e => res.send(e));

  if(!tournamentRes) {
    error.msg = "Given tournament does not exist";

    return res.send(error);
  };

  const tournamentId = tournamentRes.dataValues.id;

  //Check if team is already in given tournament
  const teamResult = await Team.findOne({
    where: {
      name: teamName,
      tournamentId
    }
  })
  .catch(e => res.send(e));

  if(teamResult) {
    error.msg = "Team already exists for given tournament";

    return res.send(error);
  }

  const newTeam = await Team.create({
    name: teamName,
    tournamentId
  });

  const teamId = newTeam.dataValues.id;

  //Register every player for given tournament
  const newTeamMembers = [];

  await Promise.all(teamMembers.map(async username => {
    
    //Get player ID
    let playerRes = await Player.findOne({ where: { username } })
    .catch(e => console.log(e));

    if(!playerRes) {
      playerRes = await createPlayer(username);
    }
    
    const playerId = playerRes.dataValues.id;

    //Check if player is registered for given tournament already
    const regisRes = await PlayerRegistration.findOne({
      where: {
        playerId,
        tournamentId
      }
    });

    if(regisRes) {
      newTeamMembers.push(`${username} is already registered for given tournament (${tournamentName})`);
      return;
    }
    
    //Register given player for given tournament
    const newTeamMember = await PlayerRegistration.create({
      playerId,
      tournamentId,
      teamId
    })
    .catch(e => console.log(e));

    newTeamMembers.push(newTeamMember.dataValues);

  }))
  .catch(e => console.log(e))
  
  const response = {
    newTeamMembers,
    newTeam
  }

  res.send(response);
}

module.exports = addTeam;