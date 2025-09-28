// backend/src/models/Claim.js
const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  claimantName: String,
  claimantEmail: String,
  proofText: String,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Claim", claimSchema);
