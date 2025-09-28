// backend/src/oop/ItemFacade.js
const Item = require("./ItemClass");
class ItemFacade {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }
  reportItem(title, category, type) {
    const item = new Item(Date.now(), title, category, type);
    this.notificationService.notify("New item reported!");
    return item;
  }
}
module.exports = ItemFacade;
