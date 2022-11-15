const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "user" WHERE "primary_member_id" = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log(`SP DB working`, result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET request", error);
      res.sendStatus(500);
    });
});

module.exports = router;
