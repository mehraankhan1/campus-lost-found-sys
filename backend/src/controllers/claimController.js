// backend/src/controllers/claimController.js
const ClaimModel = require("../models/Claim");
const ItemModel = require("../models/Item");
const { notifier, emailAdapter, UserFactory } = require("../services");

exports.createClaim = async (req, res) => {
  try {
    const { itemId, claimantName, claimantEmail, proofText } = req.body;
    const item = await ItemModel.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const claim = new ClaimModel({
      itemId,
      claimantName,
      claimantEmail,
      proofText,
    });
    const savedClaim = await claim.save();

    const fakeStaff = UserFactory.createUser(
      "staff",
      "1",
      "admin@campus.edu",
      "Security"
    );
    notifier.subscribe(fakeStaff);
    notifier.notify(`New claim for item: ${item.title}`);

    res.status(201).json(savedClaim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveClaim = async (req, res) => {
  try {
    const claim = await ClaimModel.findById(req.params.id);
    if (!claim) return res.status(404).json({ error: "Claim not found" });

    claim.approved = true;
    await claim.save();

    const item = await ItemModel.findById(claim.itemId);
    if (item) {
      item.status = "claimed";
      await item.save();
    }

    const student = UserFactory.createUser(
      "student",
      "99",
      claim.claimantEmail,
      "S-12345"
    );
    notifier.subscribe(student);
    notifier.notify(`Your claim for ${item.title} has been approved!`);
    emailAdapter.send(claim.claimantEmail, `Claim approved for ${item.title}`);

    res.json({ message: "Claim approved", claim });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
