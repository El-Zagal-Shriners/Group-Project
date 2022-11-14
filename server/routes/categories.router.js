const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// This GET will return all categories in the database
router.get("/", rejectUnauthenticated, (req, res) => {
  // select all from categories
  // console.log("in categories GET");
  const query = `SELECT * FROM "categories";`;
  pool
    .query(query)
    .then((result) => {
      // return results from query
      res.send(result.rows);
    })
    .catch((err) => {
      // log the error if one occurs
      console.log("Error in getting categories: ", err);
    });
}); // End GET categories

// export the router
module.exports = router;
