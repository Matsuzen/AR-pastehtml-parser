const Tournament = require("../models/Tournament");

async function fetchTourneyInfo(req, res) {
  const { tourneyName } = req.body;

  //Find latest for no tournament name given
  const whereClause = !tourneyName ? {} : { name: tourneyName };

  const tourneyRes = await Tournament.findAll({
    limit: 1,
    whereClause,
    order: [["id", "DESC"]]
  })
  .catch(e => {
    return res.send({
      err: true,
      msg: `Unable to find info for given tournament: ${e}`
    })
  });

}

module.exports = fetchTourneyInfo;