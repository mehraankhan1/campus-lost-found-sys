// backend/test/unit/userFactory.test.js
const { expect } = require("chai");
const UserFactory = require("../../src/services/userFactory");

describe("UserFactory", () => {
  it("creates student and staff", () => {
    const s = UserFactory.createUser("student", "1", "s@qut.edu.au", "S1");
    expect(s.verify()).to.include("student");
    const st = UserFactory.createUser("staff", "2", "t@qut.edu.au", "IT");
    expect(st.verify()).to.include("staff");
  });
});
