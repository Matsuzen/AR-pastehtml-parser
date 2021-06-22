const Tournament = require("../models/Tournament");

async function addTournament(name, dateStart, dateEnd) {
  //Given date format must be: mm/dd/yyyy
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

  const error = {
    err: true
  }

  if(!name) {
    error.message += "Tournament name can not be empty\n"
  }

  if(dateStart && !dateRegex.test(dateStart)) {
    error.message += "Start date format is invalid. Must be mm/dd/yyyy\n";
  }

  if(dateEnd && !dateRegex.test(dateEnd)) {
    error.message += "End date format is invalid. Must be mm/dd/yyyy";
  }

  if(error.message) return error;

  try {
    const newTournament = await Tournament.create({
      name,
      dateStart: dateStart && new Date(dateStart),
      dateEnd: dateEnd && new Date(dateEnd)
    });
  
    return {
      data: newTournament,
      message: `Succesfully created new tournament (${name})`
    }
    
  } catch(e) {
    return {
      err: true,
      message: `Could not create tournament: ${e}`
    }
  }
}

module.exports = addTournament;