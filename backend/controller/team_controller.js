const Team = require("../model/team_model");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const createNewTeam = asyncHandler(async (request, response) => {
  const { team_name, listOfUsers } = request.body;

  const team_id = uuidv4().slice(0, 8);

  const team = await Team.create({ team_name, team_id, listOfUsers });

  if (team) {
    response.json(team);
  } else {
    response.status(401);
    throw new Error("Something went wrong...");
  }
});

const getTeam = asyncHandler(async (request, response) => {
  const { id } = request.params;

  const team = await Team.findOne({ team_id: id });

  if (team) {
    response.json(team);
  } else {
    response.status(401);
    throw new Error("Something went wrong...");
  }
});

module.exports = { createNewTeam, getTeam };
