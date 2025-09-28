// backend/src/oop/Student.js
const User = require("./User");
class Student extends User {
  constructor(id, email, studentId) {
    super(id, email);
    this._studentId = studentId;
  }
  notify(message) {
    super.notify(`[Student] ${message}`);
  }
  verify() {
    return `Verified as student ${this._studentId}`;
  }
}
module.exports = Student;
