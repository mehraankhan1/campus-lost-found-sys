// backend/src/routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const demoAdminGuard = require("../middleware/demoAdmin");

// public item routes
router.post("/", itemController.createItem);
router.get("/", itemController.getItems);

// protected admin route - delete item
router.delete("/:id", demoAdminGuard, itemController.deleteItem);

// optional admin-only endpoints (list lost items / view claims)
router.get("/admin/lost", demoAdminGuard, itemController.getLostItems); // you can add this controller
module.exports = router;
