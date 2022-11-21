const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const { rejectNonAdministrator } = require("../modules/admin-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// route to update member's membership number and dues paid date
router.put(
  "/:memberId",
  rejectUnauthenticated,
  rejectNonAdministrator,
  (req, res) => {
    // get the memberId of member to edit from params.
    const memberId = req.params.memberId;
    // get member number and dues paid from request body.
    const memberNum = req.body.memberNumber;
    const duesPaid = req.body.duesPaid;
    // setup query to update the member.
    const queryText = `UPDATE "user" SET "dues_paid"=$1, "membership_number"=$2 WHERE "id"=$3 RETURNING "dues_paid", "membership_number";`;
    pool
      .query(queryText, [duesPaid, memberNum, memberId])
      .then((response) => {
        res.status(201).send(response.rows);
      })
      .catch((err) => {
        console.log("Error in admin updating member number and dues paid", err);
        res.sendStatus(500);
      });
  }
);

// route to approve a new member
router.put(
  "/verify/:memberId",
  rejectUnauthenticated,
  rejectNonAdministrator,
  (req, res) => {
    // get the memberId of member to edit from params.
    const memberId = req.params.memberId;
    // boolean value that can set both is_verified and is_authorized.
    const verification = req.body.verification;
    // setup query text to update the member's verification and authorized status.
    const queryText = `UPDATE "user" SET "is_authorized"=$1, "is_verified"=$1 WHERE "id"=$2;`;
    pool
      .query(queryText, [verification, memberId])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Error verifying new member", err);
        res.sendStatus(500);
      });
  }
);

// route to activate and deactivate members access to discounts
router.put(
  "/authorize/:memberId",
  rejectUnauthenticated,
  rejectNonAdministrator,
  (req, res) => {
    // get the memberId of member to edit from params.
    const memberId = req.params.memberId;
    const authorized = req.body.authorized;
    // setup SQL query text to update member's authorization status.
    const queryText = `UPDATE "user" SET "is_authorized"=$1, "review_pending"=NOT $1 WHERE "id"=$2;`;
    pool
      .query(queryText, [authorized, memberId])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("Error updating member's authorization status", err);
        res.sendStatus(500);
      });
  }
);

// route to delete a member also for deleting dependent.
router.delete(
  "/:memberId",
  rejectUnauthenticated,
  rejectNonAdministrator,
  (req, res) => {
    const memberId = req.params.memberId;
    // setup SQL query text to delete a user from the database.
    const queryText = `DELETE FROM "user" WHERE "id"=$1 OR "primary_member_id"=$1`;
    pool
      .query(queryText, [memberId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("Error deleting user account", err);
        res.sendStatus(500);
      });
  }
);

// route will add a new row to discounts_tracked
router.post(
  "/tracker/:discountId",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    const discountId = req.params.discountId;
    const userId = req.user.id;
    const discountDate = req.body.discountDate;
    // console.log(discountId, userId, discountDate);

    const query = `INSERT INTO "discounts_tracked" ("discount_id", "user_id", "date")
    VALUES ($1, $2, $3);`;

    pool
      .query(query, [discountId, userId, discountDate])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log("Error adding to discounts_tracked", err);
        res.sendStatus(500);
      });
  }
); // End POST to discount_tracker

module.exports = router;
