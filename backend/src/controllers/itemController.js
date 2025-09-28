// backend/src/controllers/itemController.js
const ItemModel = require("../models/Item");
const { facade, chain } = require("../services");

exports.createItem = async (req, res) => {
  try {
    chain.handle(req);
    const { title, category, type } = req.body;
    if (!title || !type)
      return res.status(400).json({ error: "Title and type are required" });

    const item = facade.reportItem(title, category, type);
    const dbItem = new ItemModel({
      title,
      category,
      type,
      status: item._status,
    });
    const saved = await dbItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await ItemModel.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// admin helper - list lost items
exports.getLostItems = async (req, res) => {
  try {
    const items = await ItemModel.find({ type: "lost" });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
