import redisClient from "../config/redis.js";

const cache = (keyOrFn, ttl) => async (req, res, next) => {
  try {
    const key = typeof keyOrFn === "function" ? keyOrFn(req) : keyOrFn;
    const cached = await redisClient.get(key);

    if (cached) {
      console.log(`🟢 Cache HIT: ${key}`);
      return res.json(JSON.parse(cached));
    }

    console.log(`🔴 Cache MISS: ${key}`);

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      try {
        await redisClient.setEx(key, ttl, JSON.stringify(data));
      } catch (err) {
        console.error("Redis set error:", err);
      }
      return originalJson(data);
    };

    next();
  } catch (err) {
    console.error("Cache middleware error:", err);
    next();
  }
};

export default cache;