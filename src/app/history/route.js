const express = require('express');
const handler = require("./handler");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");


router.post('/consume',verifyToken, handler.createHistory);
router.get('/',verifyToken, handler.getAllHistory);

module.exports = router;
