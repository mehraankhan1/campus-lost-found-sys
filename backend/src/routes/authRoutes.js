// routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Sign JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "supersecretkey", // TODO: use env var
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
