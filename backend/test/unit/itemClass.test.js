// backend/test/unit/itemClass.test.js
const { expect } = require("chai");
const Item = require("../../src/oop/ItemClass");

describe("ItemClass", () => {
  it("updates status and matches", () => {
    const a = new Item("1", "Black Wallet", "Personal", "lost");
    const b = new Item("2", "wallet", "Personal", "found");
    a.updateStatus("claimed");
    expect(a._status).to.equal("claimed");
    expect(a.match(b)).to.be.true;
  });
});
