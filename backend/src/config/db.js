const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (
      !process.env.NODE_ENV ||
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    ) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } else {
      console.log("Skipping DB connection in test environment");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Only auto-connect if not testing
if (!process.env.NODE_ENV || process.env.NODE_ENV !== "test") {
  connectDB();
}

module.exports = connectDB;
