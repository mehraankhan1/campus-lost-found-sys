// test/test_items.js
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let mockItems = [];

app.post("/items", (req, res) => {
  if (!req.body.name || !req.body.location) return res.status(400).send();
  const item = { id: 1, ...req.body };
  mockItems.push(item);
  res.status(201).json(item);
});

app.get("/items", (req, res) => {
  res.status(200).json(mockItems);
});

app.delete("/items/:id", (req, res) => {
  mockItems = mockItems.filter((i) => i.id != req.params.id);
  res.status(200).send();
});

describe("Item Routes", () => {
  it("should create a new item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "Lost Wallet", location: "Library" });
    if (res.status !== 201)
      throw new Error(`Expected 201 but got ${res.status}`);
  });

  it("should fetch all items", async () => {
    const res = await request(app).get("/items");
    if (res.status !== 200)
      throw new Error(`Expected 200 but got ${res.status}`);
  });

  it("should delete the created item", async () => {
    const res = await request(app).delete("/items/1");
    if (res.status !== 200)
      throw new Error(`Expected 200 but got ${res.status}`);
  });
});

module.exports = app;
