const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");
const {
  getAllFoodHandler,
  getFoodById,
  createFood,
  deleteFood,
  updateFood,
} = require("./handler");

// Apply the verifyToken middleware to the routes that require authentication
router.get("/", verifyToken, getAllFoodHandler);
router.get("/:id", verifyToken, getFoodById);
router.post("/", verifyToken, createFood);
router.delete("/:id", verifyToken, deleteFood);
router.put("/:id", verifyToken, updateFood);

module.exports = router;
