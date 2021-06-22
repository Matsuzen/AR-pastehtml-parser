//Find a match based on playing teams and/or tournament & map

const db = require("../models/db");
const { QueryTypes } = require("sequelize");

async function findMatch(team1, team2, tournamentName, mapName) {

  const error = {
    err: true
  }

  //Teams are the only mandatory params. other 2 are optional
  /* if(!team1) {
    error.message = "Team parameters are missing (!findmatch team1 team2)";
    return error;
  } */

  let matchQuery;

  let queryParams = [];

  const team1Param =`%${team1}%`;
  const team2Param = `%${team2}%`;
  
  //Queries for 2 teams is different than only 1 team
  //initial query for 2 teams
  if(team1 && team2) {
    matchQuery = `SELECT matches.*, tournaments.name AS tournamentName FROM matches, tournaments
      WHERE (REPLACE(team1, " ", "") LIKE ? OR REPLACE(team1, " ", "") LIKE ?)
      AND (REPLACE(team2, " ", "") LIKE ? OR REPLACE(team2, " ", "") LIKE ?)
      AND matches.tournamentId = tournaments.id`;

    queryParams.push(team1, team2, team1, team2);
  }
  //Initial query for 1 team
  else if(team1 || team2) {
    matchQuery = `SELECT matches.*, tournaments.name AS tournamentName FROM matches, tournaments
      WHERE (REPLACE(team1, " ", "") LIKE ?
      OR REPLACE(team2, " ", "") LIKE ?)
      AND matches.tournamentId = tournaments.id`;

    //Take whichever team is not undefined
    const teamParam = (team1 && team1Param) || (team2 || team2Param)

    queryParams.push(teamParam, teamParam);
  }
  //Initial query for no teams
  //Find the 10 latest matches
  else {
    matchQuery = `SELECT matches.*, tournaments.name AS tournamentName FROM matches, tournaments
      WHERE matches.tournamentId = tournaments.id
      ORDER BY matches.matchDate DESC
      LIMIT 10`;
  }

  //add optional tournament for searching
  if(tournamentName) {
    matchQuery += ` AND tournaments.name = ?`;

    queryParams.push(tournamentName);
  }

  //add optional map for searching
  if(mapName) {
    matchQuery += ` AND REPLACE(matches.mapName, " ", "") LIKE ?`;
    
    queryParams.push(`%${mapName}%`)
  }

  try {
    const matchResult = await db.query(matchQuery, {
      replacements: queryParams,
      type: QueryTypes.SELECT
    })

    if(matchResult.length === 0) {
      throw "No match for given parameters";
    }

    return {
      data: matchResult,
      message: "Succesfully found match(es)"
    }

  } 
  catch(e) {
    console.log(e)

    error.message = `Could not get match result for finding match: ${e}`;
    return error;
  }

}

module.exports = findMatch;