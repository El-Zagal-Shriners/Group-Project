const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", rejectUnauthenticated, rejectUnauthorizedUser, (req, res) => {
  const queryText = `SELECT
    id,
    username,
    first_name,
    last_name,
    email,
    primary_member_id,
    is_authorized,
    is_verified,
    review_pending,
    dues_paid,
    membership_number,
    admin_level
    FROM "user";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET request", error);
      res.sendStatus(500);
    });
});

module.exports = router;
