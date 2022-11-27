const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    email,
    dues_paid,
    membership_number,
  } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user"
                      (username,
                      password,
                      first_name,
                      last_name,
                      email,
                      primary_member_id,
                      dues_paid,
                      membership_number
                      )
    VALUES ($1, $2, $3, $4, $5, (select last_value from user_id_seq), $6, $7) RETURNING id`;
  pool
    .query(queryText, [
      username,
      password,
      first_name,
      last_name,
      email,
      dues_paid,
      membership_number,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// PUT to edit the current user
router.put('/', rejectUnauthenticated, (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const memberNumber = req.body.memberNumber;
  // SQL query
  const query = `UPDATE "user" 
                 SET 
                 "username"=$1,
                 "first_name"=$2, 
                 "last_name"=$3, 
                 "email"=$4, 
                 "membership_number"=$5
                 WHERE "id"=$6;`;
  pool.query(query, 
    [
      username,
      firstName, 
      lastName, 
      email,
      memberNumber,
      req.user.id
    ])
      .then(result => {
          res.sendStatus(201);
      })
      .catch(err => {
          console.log('Error editing user: ', err);
          res.sendStatus(500);
      });
});
// This will set the review pending for logged in user to true
router.put("/requestreview", rejectUnauthenticated, (req, res) => {
  // SQL query to request review
  const query = `UPDATE "user" 
                 SET 
                 "review_pending"=true
                 WHERE "id"=$1;`;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error requesting review: ", err);
      res.sendStatus(500);
    });
});

// This function will change the password for the current user
// It accepts the 'current' password and 'new' password
// Changes if old matches
router.put("/change", rejectUnauthenticated, (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = encryptLib.encryptPassword(req.body.newPassword);
  // SQL to get the encrypted version of user's password stored in the datebase
  const getCurrentPasswordQuery = `SELECT "password" FROM "user" 
                                   WHERE "id"=$1;`
  pool.query(getCurrentPasswordQuery, [req.user.id])
      .then((result) => {
        if (encryptLib.comparePassword(currentPassword, result.rows[0].password)){
          // SQL to update the password for the current user by current user id
          const passwordUpdateQuery = `UPDATE "user" 
                                       SET "password"=$1 
                                       WHERE "id"=$2;`;
          pool.query(passwordUpdateQuery, [newPassword, req.user.id])
              .then((result)=> {
                res.sendStatus(201);
              })
              .catch((err)=>{
                console.log('Error in changing password for user: ', err);
                res.sendStatus(500);
              })
        } else {
          console.log('Passwords did not match!');
          res.sendStatus(500);
        }
      })
      .catch((err)=> {
        console.log('Error in checking password for changing: ', err);
        res.sendStatus(500);
      })
});

module.exports = router;
