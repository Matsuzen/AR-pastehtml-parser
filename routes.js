const express = require("express");
const router = express.Router();

const addTeam = require("./controllers/addTeam");
const addTournament = require("./controllers/addTournament");
const removeMatch = require("./controllers/removeMatch");

router.post("/addteam", addTeam);

router.post("/addtournament", addTournament);

router.post("/removeMatch", removeMatch);

module.exports = router;