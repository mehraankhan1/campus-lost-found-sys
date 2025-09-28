// backend/test/item.test.js
const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/server");
const Item = require("../src/models/Item");

describe("Item Routes", () => {
  let createdId;

  it("creates item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ title: "Lost Wallet", category: "Personal", type: "lost" });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    createdId = res.body._id;
  });

  it("gets items", async () => {
    const res = await request(app).get("/items");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("deletes item", async () => {
    const res = await request(app).delete(`/items/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message", "Item deleted");
  });
});
