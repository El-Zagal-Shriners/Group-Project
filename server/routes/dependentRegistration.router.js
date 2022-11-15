const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");

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

// router to post to "user" table first_name, last_name, email, username, and password columns
router.post("/", (req, res) => {
  let dependent = req.body;
  console.log("Adding dependent registration information server", dependent);

  let queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name", "email", "primary_member_id")
                    VALUES($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [
      dependent.username,
      dependent.password,
      dependent.first_name,
      dependent.last_name,
      dependent.email,
      req.primary.member.id,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error POST adding dependent ");
    });
});

module.exports = router;
