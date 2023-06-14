const express = require("express");
const handler = require("./handler");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");

router.get("/",verifyToken, handler.getAllFoodHandler);
router.get("/:food_id",verifyToken, handler.getFoodById);
router.post("/create",verifyToken, handler.createFoodManual);
router.post("/createml", handler.createFoodML);
router.delete("/delete/:food_id",verifyToken, handler.deleteFood);
router.put("/update/:food_id",verifyToken, handler.updateFood);

module.exports = router;
