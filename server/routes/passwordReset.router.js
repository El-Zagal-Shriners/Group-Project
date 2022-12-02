const express = require("express");
const pool = require("../modules/pool");
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

// This route will INSERT an entry to "password_token" table
// with the secure token, email and member id associated with the
// account requesting password reset
// then sends an email to the email address
router.post("/email", (req, res, next) => {
  // generate a secure uuid token
  const token = uuidv4();
  const username = req.body.username;
  // SQL for checking if username is valid
  // returns the member id and email address
  const checkValidUsernameQuery = `SELECT "id", "email" from "user" WHERE "username"=$1;`;
  pool
    .query(checkValidUsernameQuery, [username])
    .then((result) => {
      if (result.rows <= 0) {
        res.sendStatus(500);
        return;
      }
      const memberId = result.rows[0].id;
      const savedEmail = result.rows[0].email;
      // Data for email to send to user with password reset token
      const msg = {
        to: savedEmail, // address email is being sent
        from: "elzagalcommunityportalservice@gmail.com", // account registered with sendGrid
        subject: "Shrine App Testing Emails - Password Reset",
        text: `Please follow this link to register. http://localhost:3000/#/reset/${token}`, // alternative text
        // html to display in the body of the email
        html: `<p>You have requested to reset your password on the El Zagal Shrine Member Discounts Portal.
              Please click the following link to complete your request.</p>
              <a href="http://localhost:3000/#/reset/${token}">Reset Password</a>`,
      };
      // SQL for INSERT new password token entry
      const insertQuery = `INSERT INTO "password_tokens"
                                (
                                  "primary_member_id",
                                  "token",
                                  "email"
                                ) VALUES ($1, $2, $3);`;
      pool
        .query(insertQuery, [memberId, token, savedEmail])
        .then((result) => {
          // sends email based on msg above
          sgMail
            .send(msg)
            .then(() => {
              // console.log("Password reset email sent and db entry created");
              res.sendStatus(201);
            })
            .catch((error) => {
              // log error and send error status if error occurs
              console.error("Error sending email", error);
              res.sendStatus(500);
            }); // end SEND email
        })
        .catch((err) => {
          console.log("Error in INSERT to token table: ", err);
          res.sendStatus(500);
        }); // end INSERT password_token statement
    })
    .catch((err) => {
      console.log("Error in validating password reset email: ", err);
      sendStatus(500);
    }); // end SELECT to check for valid email
}); // End POST for password token

// This POST will check if the email supplied exists
// Then will email that email address the username associated with it
router.post("/username", (req, res, next) => {
  const email = req.body.email;
  // SQL for checking if username is valid
  // returns an array of all the email's associated with
  // usernames and the email address from the database
  const checkValidEmailQuery = `SELECT ARRAY_AGG("username") AS "usernames", "email" FROM "user" WHERE "email"=$1 GROUP BY "email";`;
  pool
    .query(checkValidEmailQuery, [email])
    .then((result) => {
      if (result.rows <= 0) {
        res.sendStatus(500);
        return;
      }
      const usernames = result.rows[0].usernames;
      const savedEmail = result.rows[0].email;
      // Data for email to send list of usernames
      const msg = {
        to: savedEmail, // address email is being sent
        from: "elzagalcommunityportalservice@gmail.com", // account registered with sendGrid
        subject: "Shrine App Testing Emails - Username Request",
        // Map array to display usernames as comma separated list or singular username
        text: `The ${
          usernames.length > 1 ? "usernames" : "username"
        } for this email ${usernames.length > 1 ? "are" : "is"}  ${usernames
          .map((u) => String(u))
          .join(", ")}`, // alternative text
        // html to display in the body of the email
        html: `<p>The ${
          usernames.length > 1 ? "usernames" : "username"
        } for this email address ${
          usernames.length > 1 ? "are" : "is"
        } <strong>${usernames.map((u) => String(u)).join(", ")}</strong>.<br />
                If you did not make this request please disregard this email.</p>`,
      };
      // sends email based on msg above
      sgMail
        .send(msg)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((error) => {
          // log error and send error status if error occurs
          console.error("Error sending email", error);
          res.sendStatus(500);
        }); // end SEND email
    })
    .catch((err) => {
      console.log("Error in validating password reset email: ", err);
      sendStatus(500);
    }); // end SELECT to check for valid email
}); // End post email

// this will check if the user's token exists in the database password_tokens table
// if a match is found the user's password is updated in database
// the token record in the password_token table is then deleted
router.post("/", (req, res) => {
  const token = req.body.token;
  let primaryMemberId;
  let tokenRowId;
  // SQL to check if the the token and email are matches
  const queryText = `SELECT * FROM "password_tokens"
                       WHERE "token"=$1;`;
  pool
    .query(queryText, [token])
    .then((result) => {
      // Check to send error status if no results returned (bad token)
      // cancels rest of the POST
      if (result.rows.length < 1) {
        res.sendStatus(500);
        return;
      }
      // Encrypt password
      const password = encryptLib.encryptPassword(req.body.password);
      primaryMemberId = result.rows[0].primary_member_id;
      tokenRowId = result.rows[0].id;
      // SQL to UPDATE the user's password
      const updatePasswordQuery = `UPDATE "user" SET "password"=$1 WHERE "id"=$2;`;
      pool
        .query(updatePasswordQuery, [password, primaryMemberId])
        .then((result) => {
          // SQL to DELETE the entry for the token used to create the dependent account
          const deleteQuery = `DELETE FROM "password_tokens" WHERE "id"=$1;`;
          pool
            .query(deleteQuery, [tokenRowId])
            .then((result) => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log("Error in DELETE token row: ", err);
              res.sendStatus(500);
            }); // end DELETE query
        })
        .catch((err) => {
          console.log("Error in update user password: ", err);
          res.sendStatus(500);
        }); // end UPDATE password query
    })
    .catch((error) => {
      console.log("Error checking valid password reset token: ", error);
      res.sendStatus(500);
    }); // end SELECT to check token
}); // End POST to check email

// export the router
module.exports = router;
