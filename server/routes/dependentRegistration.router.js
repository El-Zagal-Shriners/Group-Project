const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// router to post to "user" table first_name, last_name, email, username, and password columns
router.post("/", (req, res) => {
  let dependent = req.body;
});
