const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const { v4: uuidv4 } = require("uuid");
const encryptLib = require("../modules/encryption");

// This route will send an email to the depedent account trying to be created
router.post(
  "/email",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res, next) => {
    const token = uuidv4();
    const email = req.body.email;
    console.log("In email router");
    // Data for email to send to dependent
    const msg = {
      to: email, // Change to your recipient
      from: "dvettertest@gmail.com", // Change to your verified sender
      subject: "Shrine App Testing Emails",
      text: "localhost:3000/#/dependents", // alternative text
      // html to display in the body of the email
      html: `<p>You have been invited to join the El Zagal Member Benefits Application! 
            Please click the following link to register on the website.</p>
            <a href="http://localhost:3000/#/dependents/${token}">Register Account!</a>`,
    };
    // sends email based on msg above
    sgMail
      .send(msg)
      .then(() => {
        // send success status
        console.log("Email sent");
        res.sendStatus(201);
      })
      .catch((error) => {
        // log error and send error status if error occurs
        console.error("Error sending email", error);
        res.sendStatus(500);
      });
  }
);

// router to post to "user" table first_name, last_name, email, username, and password columns
// router.post("/", (req, res) => {
//   const dependent = req.body;
//   const queryText = `INSERT INTO "user" ("username", "password", "first_name", "last_name", "email", "primary_member_id")
//                     VALUES($1, $2, $3, $4, $5, $6);`;
//   pool
//     .query(queryText, [
//       dependent.username,
//       dependent.password,
//       dependent.first_name,
//       dependent.last_name,
//       dependent.email,
//       dependent.primary_member_id,
//     ])
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log("Error POST adding dependent ", error);
//       res.sendStatus(500);
//     });
// });
// this will check if the user token exists and the email matches in the database
// if a match is found the user infomation is inserted to database
// the token record in the database is then deleted
router.post("/", (req, res) => {
  const token = req.body.token;
  const email = req.body.email;
  let primaryMemberId;
  let tokenRowId;
  const queryText = `SELECT * FROM "dependent_tokens" 
                     WHERE "token"=$1 AND "email"=$2;`;
  pool
    .query(queryText, [
      token,
      email
    ])
    .then((result) => {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const username = req.body.username;
      const password = encryptLib.encryptPassword(req.body.password);
      primaryMemberId = result.rows[0].primary_member_id;
      tokenRowId = result.rows[0].id;
      const insertQuery = `INSERT INTO "user"
      (username,
      password,
      first_name,
      last_name,
      email,
      primary_member_id)
      VALUES ($1, $2, $3, $4, $5, $6);`;
      pool.query(insertQuery, [username, password, firstName, lastName, email, primaryMemberId])
          .then((result)=> {
            const deleteQuery = `DELETE FROM "dependent_tokens" WHERE "id"=$1;`;
            pool.query(deleteQuery, [tokenRowId])
                .then((result)=>{
                  res.sendStatus(201);
                })
                .catch((err)=>{
                  console.log('Error in DELETE token row: ', err);
                  res.sendStatus(500);
                })
          })
          .catch((err) => {
            console.log('Error in INSERT dependent: ', err);
            res.sendStatus(500);
          })
    })
    .catch((error) => {
      console.log("Error checking token ", error);
      res.sendStatus(500);
    });
});

// GET to check if the user's token exists in database
router.get("/:token", (req, res) => {
  // GET route code here
  const token = req.params.token;
  console.log("Here is token: ", token);
  const query = `SELECT * FROM "dependent_tokens" 
                 WHERE "dependent_tokens"."token"=$1;`;
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
      console.log("Error in getting player games: ", err);
      res.sendStatus(500);
    });
}); // End GET user games

module.exports = router;
