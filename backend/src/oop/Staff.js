// backend/src/oop/Staff.js
const User = require("./User");
class Staff extends User {
  constructor(id, email, department) {
    super(id, email);
    this._department = department;
  }
  notify(message) {
    super.notify(`[Staff] ${message}`);
  }
  verify() {
    return `Verified as staff in ${this._department}`;
  }
}
module.exports = Staff;
