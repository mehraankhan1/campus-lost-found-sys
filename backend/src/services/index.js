// backend/src/services/index.js

// Temporarily stub NotificationService for testing
class NotificationService {
  sendNotification() {
    // do nothing
    return Promise.resolve();
  }
}

const notifier = new NotificationService();

// Keep your other services as-is
const UserFactory = require("./userFactory");
const EmailAdapter = require("./emailAdapter");
const ItemFacade = require("../oop/ItemFacade");
const chain = require("../middleware/chain");

// You can still pass the stub to the facade
const facade = new ItemFacade(notifier);

module.exports = {
  notifier,
  emailAdapter: new EmailAdapter(),
  facade,
  chain,
  UserFactory,
};
