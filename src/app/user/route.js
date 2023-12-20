const express = require("express");
const {
  getAllUsers,
  createUser,
  loginHandler,
  deleteUser,
} = require("./handler");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", createUser);
router.delete("/:id", deleteUser);
router.post("/login", loginHandler);

module.exports = router;
