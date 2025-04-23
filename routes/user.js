const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ POST /api/users/login — Validate user from DB
router.post("/login", async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone are required." });
    }

    const user = await User.findOne({ email, phone });

    if (!user) {
      return res.status(401).json({ error: "User not registered." });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

module.exports = router;
