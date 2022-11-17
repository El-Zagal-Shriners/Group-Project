const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const pool = require("../modules/pool");
const router = express.Router();


// route to update member's membership number and dues paid date

// route to approve a new member

// route to activate and deactivate members access to discounts

// route to delete a member also for deleting dependent.


module.exports = router;
