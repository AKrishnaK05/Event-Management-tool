const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");

// POST /api/registrations — Create new registration
router.post("/", async (req, res) => {
  try {
    const { userEmail, eventId, paymentMethod } = req.body;

    if (!userEmail || !eventId || !paymentMethod) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newRegistration = new Registration({ userEmail, eventId, paymentMethod });
    const saved = await newRegistration.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
