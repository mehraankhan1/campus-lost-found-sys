// backend/src/middleware/chain.js
const LogMiddleware = require("./logMiddleware");
const AuthMiddleware = require("./authMiddleware");

module.exports = new LogMiddleware(new AuthMiddleware());
