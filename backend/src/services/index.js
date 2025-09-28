// backend/src/services/index.js
const NotificationService = require("./notificationService");
const UserFactory = require("./userFactory");
const EmailAdapter = require("./emailAdapter");
const ItemFacade = require("../oop/ItemFacade");
const chain = require("../middleware/chain");

const notifier = new NotificationService();
const emailAdapter = new EmailAdapter();
const facade = new ItemFacade(notifier);

module.exports = { notifier, emailAdapter, facade, chain, UserFactory };
