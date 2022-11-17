const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const url = require("url");
const axios = require("axios");
const router = express.Router();

// route: /api/cities

// route to get all cities from the database.
router.get("/", rejectUnauthenticated, rejectUnauthorizedUser, (req, res) => {
  const queryText = `SELECT * FROM "location";`;
  pool
    .query(queryText)
    .then((response) => {
      //   console.log("All Cities:", response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error fetching all cities", err);
      res.sendStatus(500);
    });
});

// route to get the four closest cities to the user.
router.get(
  "/close",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
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
        //   console.log("Closest Cities:", response.rows);
        res.send(response.rows);
      })
      .catch((err) => {
        console.log("Error getting closest cities", err);
        res.sendStatus(500);
      });
  }
);

// a get route to check if a users location already exists,
// if not post the location to the database.
router.get(
  "/check",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    // Get the url and parse it for the query values.
    const reqUrl = url.parse(req.url, true);
    const coords = { lat: reqUrl.query.lat, lng: reqUrl.query.lng };
    //   use the user's current coordinates to get their location info.
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?&lat=${coords.lat}&lon=${coords.lng}&format=json`
      )
      .then((response) => {
        // extract the state code from the region code.
        let state = response.data.address["ISO3166-2-lvl4"];
        state = state.substring(state.indexOf("-") + 1);
        const city = response.data.address.city;
        // query to find cities within 30 miles of user.
        const queryText = `SELECT *
      FROM (SELECT *,
        ROUND(3959 * ACOS(COS(RADIANS($1)) * COS(RADIANS("lat")) *
        COS(RADIANS("lng") - RADIANS($2)) + SIN(RADIANS($1)) *
        SIN(RADIANS("lat")))) AS "distance" FROM "location") AS d
      WHERE "distance" <= '30'
      ORDER BY "distance";`;
        pool
          .query(queryText, [coords.lat, coords.lng])
          .then((response) => {
            // check if the city exists within the response and if not
            // post a query to add the city to the database.
            if (response.rows.some((e) => e.city === city)) {
              res.status(200).send("City already exists");
            } else {
              const queryText = `INSERT INTO "location" ("city", "state_code", "lng", "lat")
                VALUES($1,$2,$3,$4);`;
              pool
                .query(queryText, [city, state, coords.lng, coords.lat])
                .then((response) => {
                  res.sendStatus(201);
                })
                .catch((err) => {
                  console.log("Error adding city", err);
                  res.sendStatus(500);
                });
              res.sendStatus(201);
            }
          })
          .catch((err) => {
            console.log("Error getting cities within 30 miles of user", err);
            res.sendStatus(500);
          });
      });
  }
);

module.exports = router;
