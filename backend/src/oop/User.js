// backend/src/oop/User.js
class User {
  constructor(id, email) {
    this._id = id;
    this._email = email;
  }
  getId() {
    return this._id;
  }
  notify(message) {
    console.log(`${this._email}: ${message}`);
  }
  verify() {
    throw new Error("Implement verify in subclass");
  }
}
module.exports = User;
