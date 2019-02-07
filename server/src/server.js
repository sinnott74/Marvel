/**
 * Module dependencies.
 */
const path = require("path");
const express = require("express");

/**
 * Development EnvVars
 */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

/**
 * Adds async support to express routers
 */
require("express-async-errors");

/**
 * Adds Sync support to express routers & needs to be above import of routes
 */
const routes = require("./routes");

/**
 * Create Express server.
 */
const server = express();

// Define static assets path - i.e. styles, scripts etc.
server.use(
  "/",
  express.static(path.join(__dirname, "../../../webclient/build"), {
    maxAge: "1y",
    setHeaders: setCustomCacheControl
  })
);

// Data API routes
server.use("/api", routes);

server.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../../webclient/build/index.html"));
});

/**
 * Set custom Cache-Control header for Index.html
 */
function setCustomCacheControl(res, path) {
  if (path.endsWith("index.html") || path.endsWith("service-worker.js")) {
    res.setHeader("Cache-Control", "public, max-age=0");
  }
}

module.exports = server;
