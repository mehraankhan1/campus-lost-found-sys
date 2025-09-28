// backend/src/oop/ClaimClass.js
class Claim {
  constructor(user, item) {
    this._user = user;
    this._item = item;
    this._approved = false;
  }
  approve() {
    this._approved = true;
    this._item.updateStatus("claimed");
  }
}
module.exports = Claim;
