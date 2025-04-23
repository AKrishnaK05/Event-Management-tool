const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const sampleRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const registrationRoutes = require("./routes/registration")

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    // Start server only after DB is connected
    app.use("/api/users", sampleRoutes);
    app.use("/api/events",eventRoutes);
    app.use("/api/registrations",registrationRoutes);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
  });

