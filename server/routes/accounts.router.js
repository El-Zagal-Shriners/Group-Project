const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "user";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(`Accounts DB working`, result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET request", error);
      res.sendStatus(500);
    });
});

// router.post("/", (req, res) => {
//   let accounts = req.body;
//   console.log(" accounts POST request", accounts);

//   let queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name", "email",
//                     "dues_paid", "membership_number")
//                     VALUES ($1, $2, $3, $4, $5, $6, $7);`;
//      pool.query (queryText, [accounts.username, accounts.password, accounts.first_name, accounts.email,
//                     accounts.dues_paid, accounts.membership_number])               
// });

module.exports = router;
