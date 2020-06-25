require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models/db");

const readPastehtmls = require("./funcs/readPastehtmls");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

readPastehtmls();
