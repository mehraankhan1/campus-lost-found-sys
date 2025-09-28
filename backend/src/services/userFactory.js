// backend/src/services/userFactory.js
const Student = require("../oop/Student");
const Staff = require("../oop/Staff");
const User = require("../oop/User");

class UserFactory {
  static createUser(role, id, email, extra) {
    switch (role) {
      case "student":
        return new Student(id, email, extra);
      case "staff":
        return new Staff(id, email, extra);
      default:
        return new User(id, email);
    }
  }
}

module.exports = UserFactory;
