// backend/src/routes/claimRoutes.js
const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");

router.post("/", claimController.createClaim);
router.put("/:id/approve", claimController.approveClaim);

module.exports = router;
