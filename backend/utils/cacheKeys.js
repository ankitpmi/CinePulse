const CACHE_KEYS = {
  ALL_MOVIES: "movies:all",
  MOVIE: (id) => `movies:${id}`,
  ALL_GENRES: "genres:all",
  TOKEN_BLACKLIST: (token) => `blacklist:${token}`,
};

export const TTL = {
  MOVIES: 60 * 10,      // 10 minutes
  GENRES: 60 * 30,      // 30 minutes
  TOKEN: 60 * 60 * 24,  // 24 hours
};

export default CACHE_KEYS;