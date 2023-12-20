const express = require("express");
const handler = require("./handler");
const router = express.Router();

router.get("/", handler.getAllProducts);
router.post("/create", handler.createProduct);
router.delete("/:id", handler.deleteProduct);
router.put("/update/:id", handler.updateProduct);

module.exports = router;
