// backend/src/controllers/itemController.js
const ItemModel = require("../models/Item");

// 🔹 Constants for default values and error messages
const DEFAULT_STATUS = "unclaimed";
const REQUIRED_FIELDS_ERROR = "Title and type are required";

// ---------- Create Item ----------
exports.createItem = async (req, res) => {
  try {
    const { title, category, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: REQUIRED_FIELDS_ERROR });
    }

    const dbItem = new ItemModel({
      title,
      category: category || "",
      type,
      status: DEFAULT_STATUS,
    });

    const saved = await dbItem.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- Get All Items ----------
exports.getItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- Delete Item ----------
exports.deleteItem = async (req, res) => {
  try {
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- Get Lost Items (Admin) ----------
exports.getLostItems = async (req, res) => {
  try {
    const items = await ItemModel.find({ type: "lost" });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};