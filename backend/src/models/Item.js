// backend/src/models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  type: String,
  status: { type: String, default: "unclaimed" },
});

module.exports = mongoose.model("Item", itemSchema);
