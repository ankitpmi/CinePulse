import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {logger} from '../utils/logger.js'
import redisClient from "../config/redis.js";
import CACHE_KEYS, { TTL } from "../utils/cacheKeys.js";


const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    const genre = await new Genre({ name }).save();
    logger.info(`Genre created: ${genre.name}`);
    res.json(genre);
  } catch (error) {
    logger.error(`Error creating genre: ${error.message}`);
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
    logger.info(`Genre updated: ${updatedGenre.name}`);
  } catch (error) {
    logger.error(`Error updating genre: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Genre.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ error: "Genre not found" });
    }

    logger.info(`Genre removed: ${removed.name}`);
    res.json(removed);
  } catch (error) {
    logger.error(`Error removing genre: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// const listGenres = asyncHandler(async (req, res) => {
//   try {
//     const all = await Genre.find({});
//     res.json(all);
//   } catch (error) {
//     logger.error(`Error listing genres: ${error.message}`);
//     return res.status(400).json(error.message);
//   }
// });


// ==============================
// List Genres
// ==============================
const listGenres = asyncHandler(async (req, res) => {
  try {

    // Check Redis Cache
    const cachedGenres = await redisClient.get(CACHE_KEYS.ALL_GENRES);

    if (cachedGenres) {
      logger.info(`Genres fetched from Redis cache`);
      return res.json(JSON.parse(cachedGenres));
    }

    // Fetch From DB
    const all = await Genre.find({});

    // Store in Redis
    await redisClient.setEx(CACHE_KEYS.ALL_GENRES, TTL.GENRES, JSON.stringify(all));

    logger.info(`Genres fetched from DB`);

    res.json(all);
  } catch (error) {
    logger.error(`Error listing genres: ${error.message}`);
    return res.status(400).json(error.message);
  }
});

const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    res.json(genre);
    logger.info(`Genre read`);
  } catch (error) {
    logger.error(`Error reading genre: ${error.message}`);
    return res.status(400).json(error.message);
  }
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
