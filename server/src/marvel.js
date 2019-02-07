const crypto = require("crypto");
const fetch = require("node-fetch");

const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

const URL = "https://gateway.marvel.com:443/v1/public";

/**
 * Creates a string containing the required marvel api params
 */
function createMarvelRequiredParams() {
  const ts = new Date().getTime();
  const hash = crypto
    .createHash("md5")
    .update("" + ts + PRIVATE_KEY + PUBLIC_KEY)
    .digest("hex");
  return `ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
}

/**
 * Performs a HTTP get request
 * @param {string} url
 */
async function getData(url) {
  try {
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 */
async function getComics({ offset, limit }) {
  const requiredParams = createMarvelRequiredParams();
  const url = `${URL}/comics?${requiredParams}&offset=${offset}&limit=${limit}&orderBy=title`;
  const data = await getData(url);
  return data;
}

async function getComicsByID(id) {
  const requiredParams = createMarvelRequiredParams();
  const url = `${URL}/comics/${id}?${requiredParams}`;
  const data = await getData(url);
  return data;
}

/**
 * Marvel service
 */
const marvel = {
  getComics: getComics,
  getComicsByID: getComicsByID
};

module.exports = marvel;
