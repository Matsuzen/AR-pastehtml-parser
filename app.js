const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models/db");

const dbRoutes = require("./controllers/db/manipRoutes");

const readPastehtmls = require("./funcs/readPastehtmls");
const storePasteInfo = require("./funcs/storePasteInfo");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/db", dbRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

readPastehtmls();
