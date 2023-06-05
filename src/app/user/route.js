const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  Register,
  deleteUser,
} = require("./handler");

const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", getSingleUser);
router.post("/register", Register);
router.delete("/:id", deleteUser);

module.exports = router;
