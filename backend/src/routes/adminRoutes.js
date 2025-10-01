const express = require("express");
const router = express.Router();
const ClaimModel = require("../models/Claim");
const ItemModel = require("../models/Item");

// GET all claims
router.get("/claims", async (req, res) => {
  try {
    const claims = await ClaimModel.find();
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all lost items
router.get("/lost-items", async (req, res) => {
  try {
    const lostItems = await ItemModel.find({ type: "lost" });
    res.json(lostItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
