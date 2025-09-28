// backend/test/verify.test.js
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/server");

describe("Verify Routes", () => {
  it("verifies qut email", async () => {
    const res = await request(app)
      .post("/verify")
      .send({ email: "mehraan@student.qut.edu.au" });
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("verified");
  });

  it("returns error when email missing", async () => {
    const res = await request(app).post("/verify").send({});
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal("error");
  });
});
