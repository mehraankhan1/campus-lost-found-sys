// backend/src/controllers/itemController.js
const ItemModel = require("../models/Item");

// ---------- Create Item ----------
exports.createItem = async (req, res) => {
  try {
    const { title, category, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    // Log request for debugging
    console.log("Logging request:", req.body);

    // Optional: skip chain/facade for now if blocking
    // const item = facade.reportItem(title, category, type);
    const dbItem = new ItemModel({
      title,
      category: category || "",
      type,
      status: "unclaimed", // default status
    });

    const saved = await dbItem.save();

    console.log("Item successfully created:", saved.title);

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating item:", err);
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
