const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");

// This route will send an email to the depedent account trying to be created
router.post('/email', rejectUnauthenticated, rejectUnauthorizedUser, (req, res, next) => {
  
  const msg = {
    to: 'ddvetter23@gmail.com', // Change to your recipient
    from: 'dvettertest@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error sending email', error);
      res.sendStatus(500);
    })
})

// router to post to "user" table first_name, last_name, email, username, and password columns
router.post("/", (req, res) => {
  const dependent = req.body;
  // console.log("Adding dependent registration information server", dependent);

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
