//generic endpoints starting with / are routed here from app.js
const express = require("express");
const genericController = require("../controllers/genericController");
const router = express.Router();

router.get("/download", genericController.download);

router.get("/go-to-luke", genericController.goToLuke);

module.exports = router;