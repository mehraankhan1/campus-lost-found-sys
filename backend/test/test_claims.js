// test/test_claims.js
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

let mockClaims = [];

app.post("/claims", (req, res) => {
  const claim = { id: 1, ...req.body };
  mockClaims.push(claim);
  res.status(201).json(claim);
});

app.get("/claims", (req, res) => {
  res.status(200).json(mockClaims);
});

describe("Claim Routes", () => {
  it("should create a new claim", async () => {
    const res = await request(app).post("/claims").send({ name: "Lost Bag" });
    if (res.status !== 201)
      throw new Error(`Expected 201 but got ${res.status}`);
  });

  it("should fetch all claims", async () => {
    const res = await request(app).get("/claims");
    if (res.status !== 200)
      throw new Error(`Expected 200 but got ${res.status}`);
  });
});

module.exports = app;
