const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// This GET will return all discounts in the database
router.get("/discounts", rejectUnauthenticated, (req, res) => {
  // select all from discounts
  const query = `SELECT * FROM "discounts";`;
  pool
    .query(query)
    .then((result) => {
      // return results from query
      res.send(result.rows);
    })
    .catch((err) => {
      // log the error if one occurs
      console.log("Error in getting current discounts: ", err);
    });
}); // End GET discounts

// export the router
module.exports = router;
