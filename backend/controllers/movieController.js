import Movie from "../models/Movie.js";
import { logger } from "../utils/logger.js";
import redisClient from "../config/redis.js";
import CACHE_KEYS, { TTL } from "../utils/cacheKeys.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    logger.info(`Movie created: ${savedMovie.title}`);
    res.json(savedMovie);
  } catch (error) {
    logger.error(`Error creating movie: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// const getAllMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.json(movies);
//     logger.info(`All movies fetched`);
//   } catch (error) {
//     logger.error(`Error getting all movies: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// };

const getAllMovies = async (req, res) => {
  try {
    // Check cache first
    const cached = await redisClient.get(CACHE_KEYS.ALL_MOVIES);
    if (cached) {
      logger.info(`All movies fetched from cache`);
      console.log(`All movies fetched from cache`);
      return res.json(JSON.parse(cached));
    }

    const movies = await Movie.find();

    // Store in cache
    await redisClient.setEx(CACHE_KEYS.ALL_MOVIES, TTL.MOVIES, JSON.stringify(movies));

    res.json(movies);
    logger.info(`All movies fetched`);
  } catch (error) {
    logger.error(`Error getting all movies: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    logger.info(`Movie fetched: ${specificMovie.title}`);
    res.json(specificMovie);
  } catch (error) {
    logger.error(`Error getting specific movie: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    logger.info(`Movie updated: ${updatedMovie.title}`);
    res.json(updatedMovie);
  } catch (error) {
    logger.error(`Error updating movie: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      logger.info(`Review added to movie: ${movie.title}`);
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    logger.error(`Error adding movie review: ${error.message}`);
    res.status(400).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    logger.info(`Movie deleted: ${deleteMovie.title}`);
    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    logger.error(`Error deleting movie: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    logger.info(`Comment deleted from movie: ${movie.title}`);
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    logger.error(`Error deleting comment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    
    res.json(newMovies);
    logger.info(`New movies fetched`);
  } catch (error) {
    logger.error(`Error fetching new movies: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.json(topRatedMovies);
    logger.info(`Top movies fetched`);
  } catch (error) {
    logger.error(`Error fetching top movies: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
    logger.info(`Random movies fetched`);
  } catch (error) {
    logger.error(`Error fetching random movies: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};
