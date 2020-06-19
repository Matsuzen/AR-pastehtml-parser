const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models/db");
const parseHtml = require("./funcs/parseHtml");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const url = "http://godgamerstats.s3.amazonaws.com/summary/2020.06.14-20.45.10.html";
parseHtml(url);