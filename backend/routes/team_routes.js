const express = require("express");
const { createNewTeam, getTeam } = require("../controller/team_controller");

const router = express.Router();

router.post("/", createNewTeam);
router.get("/:id", getTeam);

module.exports = router;
