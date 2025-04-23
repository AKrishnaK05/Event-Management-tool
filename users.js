const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user")

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// 2. Sample Data
const sampleUsers = [
    { email: "adwaidk@lpu.in", phone: "9207005225", name: "Adwaid Krishna", role: "organizer" },
    { email: "madhav@lpu.in", phone: "9037486698", name: "Madhav Hemakumar" },
    { email: "arjun@lpu.in", phone: "9876543212", name: "Arjun Kumar" },
    { email: "vansh@lpu.in", phone: "9876543213", name: "Vansh raj" },
    { email: "alice@lpu.in", phone: "9876543214", name: "Alice Paul" },
    { email: "bob@lpu.in", phone: "9876543215", name: "Bob Martin" },
    { email: "charlie@lpu.in", phone: "9876543216", name: "Charlie Dev" },
    { email: "david@lpu.in", phone: "9876543217", name: "David Roy" },
    { email: "emma@lpu.in", phone: "9876543218", name: "Emma Watson" },
    { email: "frank@lpu.in", phone: "9876543219", name: "Frank Cooper" },
    { email: "grace@lpu.in", phone: "9876543220", name: "Grace Kim" },
    { email: "harry@lpu.in", phone: "9876543221", name: "Harry Wells" },
    { email: "ivy@lpu.in", phone: "9876543222", name: "Ivy George" },
    { email: "jack@lpu.in", phone: "9876543223", name: "Jack Sparrow" },
    { email: "kate@lpu.in", phone: "9876543224", name: "Kate Green" },
    { email: "leo@lpu.in", phone: "9876543225", name: "Leo Burns" },
    { email: "mia@lpu.in", phone: "9876543226", name: "Mia Khalid" },
    { email: "nina@lpu.in", phone: "9876543227", name: "Nina Shah" },
    { email: "oscar@lpu.in", phone: "9876543228", name: "Oscar Wilde" },
    { email: "pam@lpu.in", phone: "9876543229", name: "Pam Geller" }
  ];
  

// 3. Insert Data
User.insertMany(sampleUsers)
  .then(() => {
    console.log("Sample users inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting users:", err);
    mongoose.connection.close();
  });
