const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// router to post to "user" table first_name, last_name, email, username, and password columns
router.post("/:memberid", (req, res) => {
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
      dependent.primary_member_id,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error POST adding dependent ");
    });
});

module.exports = router;
