// backend/src/routes/verifyRoutes.js
const express = require("express");
const router = express.Router();
const verifyController = require("../controllers/verifyController");

router.post("/", verifyController.verifyEmail);

module.exports = router;
