const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Setup routes for /api/vendors

// Begin GET route for all vendors
router.get("/", (req, res) => {
  // GET route code here
}); // End GET for all vendors

// Begin POST for vendors
router.post("/", (req, res) => {
  // POST route code here
}); // End POST for vendors

module.exports = router;
