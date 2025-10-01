// backend/src/controllers/claimController.js
const ClaimModel = require("../models/Claim");
const ItemModel = require("../models/Item");
const { notifier, emailAdapter, UserFactory } = require("../services");

exports.createClaim = async (req, res) => {
  try {
    console.log("===== CREATE CLAIM =====");
    console.log("Request body:", req.body);
    console.log("Headers:", req.headers);

    const { itemId, claimantName, claimantEmail, proofText } = req.body;
    console.log("Parsed fields:", {
      itemId,
      claimantName,
      claimantEmail,
      proofText,
    });

    // Validate required fields
    if (!itemId || !claimantName || !claimantEmail || !proofText) {
      console.log("Missing required fields!");
      return res.status(400).json({ error: "All fields are required" });
    }

    const item = await ItemModel.findById(itemId);
    console.log("Fetched item from DB:", item);

    if (!item) return res.status(404).json({ error: "Item not found" });

    const claim = new ClaimModel({
      itemId,
      claimantName,
      claimantEmail,
      proofText,
    });
    const savedClaim = await claim.save();
    console.log("Saved claim:", savedClaim);

    res.status(201).json(savedClaim);
  } catch (err) {
    console.error("ERROR in createClaim:", err);
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
