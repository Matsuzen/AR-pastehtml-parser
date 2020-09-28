const Tournament = require("../models/Tournament");

async function addTournament(req, res) {
  //Dates are optional
  const { name, dateStart, dateEnd } = req.body;

  //Given date format must be: mm/dd/yyyy
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

  const error = {
    err: true
  }

  if(!name) {
    error.msg = "Tournament name can not be empty"
    return res.send(error);
  }

  if(dateStart && !dateRegex.test(dateStart)) {
    error.msg = "Start date format is invalid. Must be mm/dd/yyyy";
    return res.send(error)
  }

  if(dateEnd && !dateRegex.test(dateEnd)) {
    error.msg = "End date format is invalid. Must be mm/dd/yyyy";
    return res.send(error)
  }

  const newTournament = await Tournament.create({
    name,
    dateStart: dateStart && new Date(dateStart),
    dateEnd: dateEnd && new Date(dateEnd)
  });

  res.send({
    msg: "Tournament succesfully created",
    newTournament
  });
}

module.exports = addTournament;