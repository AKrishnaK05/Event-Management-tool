const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// GET /api/events — Fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new event
router.post("/", async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const saved = await newEvent.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;