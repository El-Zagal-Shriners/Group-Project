const express = require("express");
const pool = require("../modules/pool");
const url = require("url");
const router = express.Router();

// route: /api/cities

// route to get all cities from the database.
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "location";`;
  pool
    .query(queryText)
    .then((response) => {
      console.log("All Cities:", response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error fetching all cities", err);
      res.sendStatus(500);
    });
});

// route to get the four closest cities to the user.
router.get("/close", (req, res) => {
  // url should look like: `/api/locations/close?lat=value&lng=value`
  // Get the url and parse it for the query values.
  const reqUrl = url.parse(req.url, true);
  // Store the url queries into an object.
  const coords = { lat: reqUrl.query.lat, lng: reqUrl.query.lng };
  // setup query text to calculate the distances between the user and
  // the cities in the DB and return the shortest closest cities with distance in miles.
  const queryText = `SELECT *,
  ROUND(3959 * ACOS(COS(RADIANS($1)) * COS(RADIANS("lat")) * 
  COS(RADIANS("lng") - RADIANS($2)) + SIN(RADIANS($1)) * 
  SIN(RADIANS("lat")))) AS "distance"
  FROM "location"
  ORDER BY "distance"
  LIMIT 4;`;
  pool
    .query(queryText, [coords.lat, coords.lng])
    .then((response) => {
      console.log("Closest Cities:", response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error getting closest cities", err);
      res.sendStatus(500);
    });
});

module.exports = router;
