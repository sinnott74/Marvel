const cache = require("memory-cache");

/**
 * Express middleware to cache the response of a request for a given duration.
 * @param {number} duration time to cache response in ms
 */
function cacheMiddleware(duration) {
  return function(req, res, next) {
    const key = "__express__" + req.originalUrl || req.url;
    console.log(key);
    const cachedResult = cache.get(key);
    if (cachedResult) {
      res.json(cachedResult);
      return;
    } else {
      res.sendJSON = res.json;
      res.json = json => {
        cache.put(key, json, duration);
        res.sendJSON(json);
      };
      next();
    }
  };
}

module.exports = cacheMiddleware;
