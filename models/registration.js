const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userEmail: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  paymentMethod: String,
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
