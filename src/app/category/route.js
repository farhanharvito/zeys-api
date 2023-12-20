const express = require("express");
const handler = require("./handler");
const router = express.Router();

router.get("/", handler.getAllCategory);
router.post("/create", handler.createCategory);
router.delete("/:id", handler.deleteCategory);
router.put("/update/:id", handler.updateCategory);

module.exports = router;
