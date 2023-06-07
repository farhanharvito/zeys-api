const express = require("express");
const handler = require("./handler");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");

// Get all reminders
router.get("/reminder", verifyToken, handler.getAllRemindersHandler);

// Create a new reminder
router.post("/reminder", verifyToken, handler.createReminder);

// Get reminder by ID
router.get("/reminder/:id", verifyToken, handler.getReminderById);

// Detect expired foods
router.get("/expired-foods", verifyToken, handler.detectExpiredFood);

module.exports = router;


