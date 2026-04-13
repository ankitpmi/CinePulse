const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/moviesApp";

// Schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const Genre = mongoose.model("Genre", genreSchema);

// Seed Data
const genres = [
  { name: "Action" },
  { name: "Adventure" },
  { name: "Biography" },
  { name: "Comedy" },
  { name: "Crime" },
  { name: "Documentary" },
  { name: "Drama" },
  { name: "Family" },
  { name: "History" },
  { name: "Horror" },
  { name: "Mystery" },
  { name: "Romance" },
  { name: "Sci-Fi" },
  { name: "Thriller" }
];

const seedGenres = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // 🔍 Check if collection has any data
    const count = await Genre.countDocuments();

    if (count > 0) {
      console.log("⚠️ Genres already exist. Skipping seed.");
      return process.exit();
    }

    // ✅ Insert only if empty
    await Genre.insertMany(genres);

    console.log("✅ Genres seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding genres:", error);
    process.exit(1);
  }
};

seedGenres();