const mongoose = require("mongoose");
require("dotenv").config();
const Event = require("./models/event");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected for seeding"))
.catch((err) => console.error("Connection error:", err));

// Sample Events
const sampleEvents = [
    {
        title: "Hackathon 2025",
        description: "Compete with the best minds to solve real-world problems.",
        date: "2025-04-15",
        category: "tech",
        image: "https://i.ibb.co/Xq5nyTn/hackathon.jpg",
        price: "150",
        organiser: "Tech Society"
    },
    {
        title: "Cultural Night",
        description: "Celebrate traditions and performances from across the globe.",
        date: "2025-04-18",
        category: "cultural",
        image: "https://i.ibb.co/PvgTkCHZ/cultural-nights.jpg",
        price: "100",
        organiser: "Cultural Committee"
    },
    {
        title: "Gaming Fest",
        description: "Show off your skills in Valorant and BGMI tournaments.",
        date: "2025-04-20",
        category: "gaming",
        image: "https://i.ibb.co/67kZmNhN/gaming-fest-1.jpg",
        price: "150",
        organiser: "Gamers Club"
    },
    {
        title: "Photography Workshop",
        description: "Learn camera basics, framing, and post-processing.",
        date: "2025-04-22",
        category: "arts",
        image: "https://i.ibb.co/RkM0Ndry/photography.jpg",
        price: "200",
        organiser: "Arts & Media Club"
    },
    {
        title: "Robotics Expo",
        description: "Student innovations and robot battles!",
        date: "2025-04-25",
        category: "tech",
        image: "https://i.ibb.co/WhdBRKL/Robotics-Expo.jpg",
        price: "200",
        organiser: "Robotics Club"
    },
    {
        title: "Music Fest",
        description: "Band wars, solo vocals, and DJ nights.",
        date: "2025-04-27",
        category: "cultural",
        image: "https://i.ibb.co/V0zb6kJS/Supersonic-jpg.webp",
        price: "250",
        organiser: "Music Club"
    },
    {
        title: "Code Sprint",
        description: "24-hour coding challenge with real-time leaderboards.",
        date: "2025-04-30",
        category: "tech",
        image: "https://i.ibb.co/nMbGsgMr/codesprint.jpg",
        price: "50",
        organiser: "Developer Circle"
    },
    {
        title: "Drama Showcase",
        description: "Stage plays performed by university students.",
        date: "2025-05-02",
        category: "arts",
        image: "https://i.ibb.co/3yvk17JY/drama.jpg",
        price: "80",
        organiser: "Dramatics Club"
    },
    {
        title: "LAN Gaming Night",
        description: "Dota, CS:GO, and FIFA under one roof.",
        date: "2025-05-05",
        category: "gaming",
        image: "https://i.ibb.co/xKds6GPM/Gaming-Night.jpg",
        price: "120",
        organiser: "eSports League"
    },
    {
        title: "AI Bootcamp",
        description: "3-day deep dive into AI and ML applications.",
        date: "2025-05-07",
        category: "tech",
        image: "https://i.ibb.co/1f3v91dT/AI-Bootcamp.webp",
        price: "300",
        organiser: "AI Society"
    }
];
// Insert Data
Event.insertMany(sampleEvents)
  .then(() => {
    console.log("Sample events inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting events:", err);
    mongoose.connection.close();
  });
