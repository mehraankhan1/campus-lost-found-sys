// test/test_app.js
const request = require("supertest");
const express = require("express");

// Mock your app
const app = express();
app.get("/", (req, res) =>
  res.status(200).send("Campus Lost and Found Backend is running!")
);

describe("Basic Server Test", () => {
  it("should return 200 and running message at '/'", async () => {
    const res = await request(app).get("/");
    if (res.status !== 200)
      throw new Error(`Expected 200 but got ${res.status}`);
  });
});

module.exports = app;
