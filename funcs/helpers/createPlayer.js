const Player = require("../../models/Player");
const axios = require("axios");
const fs = require("fs");

const db = require("../../models/db");
const { QueryTypes } = require("sequelize"); 

//Insert a row in the players table
async function createPlayer(username) {
  try {

    let uuid = "";

    const playerRes = await Player.findOne({ where: { username }, raw: true });

    if(playerRes && playerRes.uuid) {
      uuid = playerRes.uuid 
    } 

    //No username's uuid stored in db, fetch from mojang api
    if(!uuid) {
      const uuidUrl = `https://api.mojang.com/users/profiles/minecraft/${username}`;
  
      const userRes = await axios.get(uuidUrl);
      uuid = userRes.data.id || ""

    }

    const whereClause = {};

    //Search for existing player by uuid or username
    if(uuid) {
      whereClause.uuid = uuid;
    } else {
      whereClause.username = username;
    }

    let newPlayer;

    try {
      newPlayer = await Player.findOrCreate({
        where: whereClause,
        defaults: {
          username,
          uuid
        }
      })

    } catch(e) {
      return {
        err: true,
        e
      }
    }

    const newPlayerValues = newPlayer && newPlayer[0] && newPlayer[0].dataValues;

    //When the username has no uuid, update uuid to be player's id
    if(!newPlayerValues || !newPlayerValues.uuid) {
      const noUuidQuery = "UPDATE players SET uuid = CONVERT(id, CHAR) WHERE username = ?";
  
      await db.query(noUuidQuery, { 
        replacements: [username]
      })
    }

    return newPlayerValues;
    
  } catch(e) {
    fs.appendFile(
      `${__dirname}/../../errors`, 
      `${e} - ${e.stack}\n`,
      err => {
        if(err) throw err;
      }
    )

    return {
      err: true,
      e
    }
  }
  

}

module.exports = createPlayer;