const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./src/routes/adminRoutes");
dotenv.config();

// Connect to DB only if NOT running tests
if (process.env.NODE_ENV !== "test") {
  require("./src/config/db");
}

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/items", require("./src/routes/itemRoutes"));
app.use("/claims", require("./src/routes/claimRoutes"));
app.use("/verify", require("./src/routes/verifyRoutes"));
app.use("/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("Campus Lost and Found Backend is running!");
});

// Only listen when run directly (so tests can import app)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
