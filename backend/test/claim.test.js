// backend/test/claim.test.js
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/server");
const Item = require("../src/models/Item");

describe("Claim Routes", () => {
  let itemId, claimId;

  before(async () => {
    const item = await new Item({
      title: "Phone",
      category: "Electronics",
      type: "lost",
    }).save();
    itemId = item._id;
  });

  it("creates claim", async () => {
    const res = await request(app).post("/claims").send({
      itemId,
      claimantName: "John Doe",
      claimantEmail: "john@student.qut.edu.au",
      proofText: "Proof",
    });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    claimId = res.body._id;
  });

  it("approves claim", async () => {
    const res = await request(app).put(`/claims/${claimId}/approve`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Claim approved");
  });
});
