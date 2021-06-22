require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models/db");

const router = require("./routes");

// const readPastehtmls = require("./funcs/readPastehtmls");
// const exportStats = require("./funcs/exportStats");
// const updateSpreadsheet = require("./funcs/updateSpreadsheet");
// const findTeamsFromSheet = require("./funcs/findTeamsFromSheet");
// const insertTeams = require("./funcs/insertTeams");
// const findMatch = require("./funcs/findMatch");
// const parseHtml = require("./funcs/parseHtml");

const initDiscordBot = require("./funcs/discord/initDiscordBot")();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/db", router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));