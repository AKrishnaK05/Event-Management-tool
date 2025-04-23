const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    category: String,
    image: String,
    price: Number,
    organizer: String
});

module.exports = mongoose.model("Event", eventSchema);
