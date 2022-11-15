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

// Begin POST for new vendors
router.post("/", rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const stateCode = req.body.stateCode;
  const zip = req.body.zip;
  const query = `INSERT INTO "vendors" ("name", "address", "city", "state_code", "zip")
                 VALUES ($1, $2, $3, $4, $5);`;
  pool.query(query, [name, address, city, stateCode, zip])
      .then(result => {
        // send success status
          res.sendStatus(201);
      })
      .catch((err) => {
        // log error and send error status if error occurs
          console.log('Error in POST new vendor: ', err);
          res.sendStatus(500);
      })
  
}); // End POST for new vendors

module.exports = router;
