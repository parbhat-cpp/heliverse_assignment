const express = require("express");
const {
  getUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controller/user_controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
