const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { rejectNonAdministrator } = require("../modules/admin-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// GET all member accounts without password
router.get("/", rejectUnauthenticated, rejectNonAdministrator, (req, res) => {
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
    FROM "user" ORDER BY "last_name";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET request", error);
      res.sendStatus(500);
    });
}); // End GET for all members

// GET any dependents for the current user
router.get("/dependents", rejectUnauthenticated, (req, res) => {
  // SQL query text
  const queryText = `SELECT
        "first_name",
        "last_name",
        "email",
        "id",
        "username"
      FROM "user"
      WHERE "id"!=$1 AND "primary_member_id"=$1;`;
  // Run query against the database
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      // Return results on success
      res.send(result.rows);
    })
    .catch((error) => {
      // Log and send back error status if error occurs
      console.log("Error in getting dependents", error);
      res.sendStatus(500);
    });
}); // End GET dependents

// DELETE a dependent account
router.delete(
  "/dependent/:userid",
  rejectUnauthenticated,
  rejectNonAdministrator,
  (req, res) => {
    const userId = req.params.userid;
    const query = `DELETE FROM "user"
                 WHERE "id"=$1 AND "primary_member_id"=$2;`;
    pool
      .query(query, [userId, req.user.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("Error deleting dependent ", err);
        res.sendStatus(500);
      });
  }
); // End DELETE dependent

module.exports = router;
