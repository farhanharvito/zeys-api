const express = require("express");
const handler = require("./handler");
const router = express.Router();

router.get("/", handler.getAllCampaign);
router.post("/create", handler.createCampaign);
router.delete("/:id", handler.deleteCampaign);
router.put("/update/:id", handler.updateCampaign);

module.exports = router;
