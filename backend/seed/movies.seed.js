const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/moviesApp";

// ✅ Schema (no genre)
const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    year: Number,
    detail: String,
    cast: [String],
    numReviews: { type: Number, default: 0 },
    reviews: { type: Array, default: [] }
  },
  { timestamps: true }
);

// ✅ Force collection name = "movies"
const Movie = mongoose.model("Movie", movieSchema, "movies");

// ✅ Full Data
const movies = [
  {
    name: "Inception",
    image: "/uploads/image-1776072934842.png",
    year: 2010,
    detail:
      "A skilled thief enters people’s dreams to steal secrets but is given a complex task of planting an idea into someone’s mind, leading to layered realities and psychological challenges.",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy"
    ]
  },
  {
    name: "The Dark Knight",
    image: "/uploads/image-1776073011263.jpeg",
    year: 2008,
    detail:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos, forcing Batman to confront moral dilemmas.",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Gary Oldman"
    ]
  },
  {
    name: "Interstellar",
    image: "/uploads/image-1776073069532.jpeg",
    year: 2014,
    detail:
      "A group of astronauts travels through a wormhole in search of a new habitable planet as Earth faces environmental collapse.",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine"
    ]
  },
  {
    name: "3 Idiots",
    image: "/uploads/image-1776073128038.webp",
    year: 2009,
    detail:
      "Three engineering students navigate college life, friendship, and societal pressure while redefining the meaning of success.",
    cast: [
      "Aamir Khan",
      "R. Madhavan",
      "Sharman Joshi",
      "Kareena Kapoor"
    ]
  },
  {
    name: "Avengers: Endgame",
    image: "/uploads/image-1776073172349.jpeg",
    year: 2019,
    detail:
      "The Avengers assemble one final time to reverse the devastating effects caused by Thanos and restore balance to the universe.",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson",
      "Chris Hemsworth"
    ]
  },
  {
    name: "Dangal",
    image: "/uploads/image-1776073230863.jpeg",
    year: 2016,
    detail:
      "Based on a true story, a former wrestler trains his daughters to become world-class wrestlers, challenging societal norms and achieving international success.",
    cast: [
      "Aamir Khan",
      "Fatima Sana Shaikh",
      "Sanya Malhotra",
      "Sakshi Tanwar"
    ]
  }
];

// ✅ Seed Function
const seedMovies = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // 🔍 Check if data already exists
    const existing = await Movie.findOne();

    if (existing) {
      console.log("⚠️ Movies already exist. Skipping seed.");
      process.exit();
    }

    // ✅ Insert data
    await Movie.insertMany(movies);

    console.log("✅ Movies seeded successfully into 'movies' collection");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding movies:", error);
    process.exit(1);
  }
};

// ▶️ Run
seedMovies();