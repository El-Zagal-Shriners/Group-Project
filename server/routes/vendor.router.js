const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// Setup routes for /api/vendors

// Begin GET route for all vendors
router.get("/", rejectUnauthenticated, (req, res) => {
  // SQL for GET
  const query = `SELECT * FROM "vendors"`;
  // Run SQL against the database
  pool.query(query)
      .then(result => {
        // Send back results
        res.send(result.rows);
      })
      .catch((err) => {
        // Log error and send error status if error occurs
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
  // SQL for POST
  const query = `INSERT INTO "vendors" ("name", "address", "city", "state_code", "zip")
                 VALUES ($1, $2, $3, $4, $5);`;
  // Run SQL against the database
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

// PUT for editing existing vendor info by vendorId
router.put('/', rejectUnauthenticated, (req, res) => {
  // Variables from req.body
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const stateCode = req.body.stateCode;
  const zip = req.body.zip;
  const vendorId = req.body.vendorId;
  // SQL for PUT
  const query = `UPDATE "vendors" 
                 SET "name"=$1, "address"=$2, "city"=$3, "state_code"=$4, "zip"=$5 
                 WHERE "id"=$6;`;
  // Run SQL against database
  pool.query(query, [name, address, city, stateCode, zip, vendorId])
      .then(result => {
        // Send success status  
        res.sendStatus(200);
      })
      .catch(err => {
          // Log error and send error status if error occurs
          console.log('Error editing vendor ', err);
          res.sendStatus(500);
      });
}); // End vendor editing PUT

// DELETE for removing a vendor by vendorId
router.delete('/:vendorid', rejectUnauthenticated, (req, res) => {
  const vendorId = req.params.vendorid;
  // SQL for DELETE
  const query = `DELETE FROM "vendors" 
                 WHERE "id"=$1;`;
  // Run SQL against database
  pool.query(query, [vendorId])
      .then(result => {
        // Send success status
          res.sendStatus(200);
      })
      .catch(err => {
        // Log error and send error status if error occurs
          console.log('Error deleting a vendor', err);
          res.sendStatus(500);
      });
}); // End vendor delete

// Export Router
module.exports = router;
