// backend/src/oop/ItemClass.js
class Item {
  constructor(id, title, category, type) {
    this._id = id;
    this._title = title;
    this._category = category;
    this._type = type;
    this._status = "unclaimed";
  }
  updateStatus(status) {
    this._status = status;
  }
  match(otherItem) {
    return (
      this._title.toLowerCase().includes(otherItem._title.toLowerCase()) &&
      this._category === otherItem._category
    );
  }
}
module.exports = Item;
