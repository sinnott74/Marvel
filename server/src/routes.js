const express = require("express");
const marvel = require("./marvel");
const cache = require("./cache");
const router = express.Router();

const DURATION24HRS = 24 * 60 * 60 * 1000;

// Cache response for 24hrs as allowed by marvel's T&Cs
// https://developer.marvel.com/documentation/attribution
router.use(cache(DURATION24HRS));

/**
 * GET /comics
 */
router.get("/comics", async function(req, res) {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 20;
  const data = await marvel.getComics({ offset, limit });
  res.json(data);
});

/**
 * GET /comic/:id
 * id is a charactedId in marvel's documentation
 */
router.get("/comics/:id", async function(req, res) {
  const id = req.params.id;
  const data = await marvel.getComicsByID(id);
  res.json(data);
});

module.exports = router;
