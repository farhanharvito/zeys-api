const express = require("express");
const handler = require("./handler");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");

router.get("/",verifyToken, handler.getAllFoodHandler);
router.get("/:id",verifyToken, handler.getFoodById);
router.post("/create",verifyToken, handler.createFoodManual);
router.post("/createml", handler.createFoodML);
router.delete("/delete/:id",verifyToken, handler.deleteFood);
router.put("/update/:id",verifyToken, handler.updateFood);

module.exports = router;
