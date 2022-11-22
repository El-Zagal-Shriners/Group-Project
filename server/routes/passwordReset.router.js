const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const router = express.Router();
const encryptLib = require("../modules/encryption");

// GET to check if the user's token exists in database
router.get("/:token", (req, res) => {
    // GET route code here
    const token = req.params.token;
    const query = `SELECT * FROM "password_tokens"
                   WHERE "password_tokens"."token"=$1;`;
    pool
      .query(query, [token])
      .then((result) => {
        if (result.rows.length > 0) {
          res.send("true");
        } else {
          res.send("false");
        }
      })
      .catch((err) => {
        console.log("Error in password reset token check: ", err);
        res.sendStatus(500);
      });
  }); // End GET user games

// export the router
module.exports = router;