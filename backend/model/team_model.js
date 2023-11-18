const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  team_id: { type: String, unique: true },
  team_name: String,
  listOfUsers: Array,
});

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
