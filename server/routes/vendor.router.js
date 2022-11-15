const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// Setup routes for /api/vendors

// Begin GET route for all vendors
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const query = `SELECT * FROM "vendors"`;
  pool.query(query)
      .then(result => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error in getting vendors: ', err);
        res.sendStatus(500);
      })
}); // End GET for all vendors

// Begin POST for vendors
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
}); // End POST for vendors

module.exports = router;
