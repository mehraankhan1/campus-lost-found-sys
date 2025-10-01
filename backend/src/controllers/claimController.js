// backend/src/controllers/claimController.js
const ClaimModel = require("../models/Claim");
const ItemModel = require("../models/Item");
const { notifier, emailAdapter, UserFactory } = require("../services");

// 🔹 Constants for default messages and statuses
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "All fields are required",
  ITEM_NOT_FOUND: "Item not found",
  CLAIM_NOT_FOUND: "Claim not found",
};

const ITEM_STATUS = {
  CLAIMED: "claimed",
};

exports.createClaim = async (req, res) => {
  try {
    const { itemId, claimantName, claimantEmail, proofText } = req.body;

    // Validate required fields
    if (!itemId || !claimantName || !claimantEmail || !proofText) {
      return res.status(400).json({ error: ERROR_MESSAGES.REQUIRED_FIELDS });
    }

    const item = await ItemModel.findById(itemId);
    if (!item) return res.status(404).json({ error: ERROR_MESSAGES.ITEM_NOT_FOUND });

    const claim = new ClaimModel({
      itemId,
      claimantName,
      claimantEmail,
      proofText,
    });
    const savedClaim = await claim.save();

    res.status(201).json(savedClaim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveClaim = async (req, res) => {
  try {
    const claim = await ClaimModel.findById(req.params.id);
    if (!claim) return res.status(404).json({ error: ERROR_MESSAGES.CLAIM_NOT_FOUND });

    claim.approved = true;
    await claim.save();

    const item = await ItemModel.findById(claim.itemId);
    if (item) {
      item.status = ITEM_STATUS.CLAIMED;
      await item.save();
    }

    const student = UserFactory.createUser(
      "student",
      "99",
      claim.claimantEmail,
      "S-12345"
    );
    notifier.subscribe(student);
    notifier.notify(Your claim for ${item.title} has been approved!);
    emailAdapter.send(claim.claimantEmail, Claim approved for ${item.title});

    res.json({ message: "Claim approved", claim });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};