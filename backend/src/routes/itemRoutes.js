// backend/src/routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const demoAdminGuard = require("../middleware/demoAdmin");
const { AdminProxy } = require("../oop/AdminProxy");
// public item routes
router.post("/", itemController.createItem);
router.get("/", itemController.getItems);

// protected admin route - delete item
router.delete("/:id", demoAdminGuard, itemController.deleteItem);

// optional admin-only endpoints (list lost items / view claims)
router.get("/admin/lost", demoAdminGuard, itemController.getLostItems); // you can add this controller

router.delete("/:id", (req, res) => {
  const { email, password } = req.body; // short hack for demo
  const admin = new AdminProxy(email, password);

  const result = admin.deleteItem(req.params.id);
  if (result.startsWith("Access denied")) {
    return res.status(403).json({ message: result });
  }

  // Normal delete code here
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: result }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
