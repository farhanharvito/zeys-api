const express = require("express");
const handler = require("./handler");
const router = express.Router();

router.get("/", handler.getAllFoodHandler);
router.post("/", handler.createFood);
router.delete("/:id", handler.deleteFood);
router.put("/:id", handler.updateFood);

module.exports = router;
