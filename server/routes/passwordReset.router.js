const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const encryptLib = require("../modules/encryption");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  // This route will INSERT an entry to "dependent_token" table
// with the secure token, email and member id associated with the
// dependent account being created
// then sends an email to the depedent account
router.post(
  "/email",
  (req, res, next) => {
    // generate a secure uuid token
    const token = uuidv4();
    const email = req.body.email;
    // Data for email to send to dependent
    const msg = {
      to: email, // address email is being sent
      from: "dvettertest@gmail.com", // account registered with sendGrid
      subject: "Shrine App Testing Emails - Password Reset",
      text: `Please follow this link to register. http://localhost:3000/#/reset/${token}`, // alternative text
      // html to display in the body of the email
      html: `<p>You have requested to reset your password on the El Zagal Shrine Member Discounts Portal.
              Please click the following link to complete your request.</p>
              <a href="http://localhost:3000/#/reset/${token}">Reset Password</a>`,
    };
    const checkValidEmailQuery = `SELECT "id" from "user" WHERE "email"=$1;`;
    pool
      .query(checkValidEmailQuery, [email])
      .then((result) => {
        if (result.rows <= 0) {
          sendStatus(500);
          return;
        }
        const memberId = result.rows[0].id
        const insertQuery = `INSERT INTO "password_tokens"
                                (
                                  "primary_member_id",
                                  "token",
                                  "email"
                                ) VALUES ($1, $2, $3);`;
        pool
          .query(insertQuery, [memberId, token, email])
          .then((result) => {
            // sends email based on msg above
            sgMail
              .send(msg)
              .then(() => {
                console.log("Password reset email sent and db entry created");
                res.sendStatus(201);
              })
              .catch((error) => {
                // log error and send error status if error occurs
                console.error("Error sending email", error);
                res.sendStatus(500);
              });
          })
          .catch((err) => {
            console.log("Error in INSERT to token table: ", err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log("Error in validating password reset email: ", err);
        sendStatus(500);
      });
  }
);

// export the router
module.exports = router;