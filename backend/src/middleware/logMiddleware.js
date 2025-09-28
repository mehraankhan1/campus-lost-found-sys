// backend/src/middleware/logMiddleware.js
class LogMiddleware {
  constructor(next = null) {
    this.next = next;
  }

  handle(req) {
    console.log("Logging request:", req.body);
    if (this.next) this.next.handle(req);
  }
}

module.exports = LogMiddleware;
