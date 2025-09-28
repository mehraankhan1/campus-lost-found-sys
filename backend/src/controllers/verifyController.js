// backend/src/controllers/verifyController.js
const { notifier, UserFactory } = require("../services");

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ status: "error", message: "Email is required" });

    const emailDomain = email.split("@")[1];
    let response;

    if (emailDomain === "student.qut.edu.au" || emailDomain === "qut.edu.au") {
      response = {
        status: "verified",
        message: "QUT email verified successfully",
        userType: "student",
      };
    } else if (["gmail.com", "outlook.com"].includes(emailDomain)) {
      response = {
        status: "verification_sent",
        message: `Verification email sent to ${email}`,
        userType: "guest",
      };
    } else {
      response = {
        status: "pending_review",
        message: "Email requires manual verification by admin",
        userType: "unknown",
      };
    }

    const admin = UserFactory.createUser(
      "staff",
      "999",
      "admin@campus.edu",
      "IT"
    );
    notifier.subscribe(admin);
    notifier.notify(`Email verification requested for: ${email}`);

    res.json(response);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
