// backend/src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

require("./config/db"); // connect to DB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/items", require("./routes/itemRoutes"));
app.use("/claims", require("./routes/claimRoutes"));
app.use("/verify", require("./routes/verifyRoutes"));

app.get("/", (req, res) => {
  res.send("Campus Lost and Found Backend is running!");
});

// Only listen when run directly (so tests can import app)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
