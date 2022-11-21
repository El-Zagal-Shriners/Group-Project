const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const {
  rejectUnauthorizedUser,
} = require("../modules/authorization-middleware");
const router = express.Router();

// This GET will return all discounts with their parent vendor info and category info
// All relevent info for the member discount page
router.get(
  "/member",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    // select all from discounts with calculated number of discount uses for 7 days, 30 days, 1 year and all time
    const query = `SELECT "discounts"."id" as "discount_id", "vendor_id", "description", "start_date", "expiration_date", "discount_code", "category_id", "is_regional", "vendors"."name" as "vendor_name", "address", "city", "state_code", "zip", "categories"."name" as "category_name", "icon_class"
  FROM "discounts"
  JOIN "vendors" ON "vendors"."id" = "vendor_id"
  JOIN "categories" ON "categories"."id" = "category_id"
  WHERE "is_shown"=true;`;
    pool
      .query(query)
      .then((result) => {
        // return results from query
        res.send(result.rows);
      })
      .catch((err) => {
        // log the error if one occurs
        console.log("Error in getting current discounts: ", err);
      });
  }
); // End GET discounts

// This GET will return all discounts in the database (for admin page)
router.get(
  "/admin",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    // select all from discounts with calculated number of discount uses for 7 days, 30 days, 1 year and all time
    const query = `SELECT "discounts".*,
	count("discounts_tracked"."id") AS "discounts_all_time",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '7 days') AND CURRENT_DATE) AS "seven_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '30 days') AND CURRENT_DATE) AS "thirty_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '1 year') AND CURRENT_DATE) AS "one_year_count"
	FROM "discounts"
	JOIN "discounts_tracked" ON "discounts_tracked"."discount_id"="discounts"."id"
	GROUP BY "discounts_tracked"."discount_id", "discounts"."id"
	ORDER BY "discounts"."id";`;
    pool
      .query(query)
      .then((result) => {
        // return results from query
        res.send(result.rows);
      })
      .catch((err) => {
        // log the error if one occurs
        console.log("Error in getting current discounts: ", err);
      });
  }
); // End GET discounts

// This POST will add a new discount to the discount table
router.post("/", rejectUnauthenticated, rejectUnauthorizedUser, (req, res) => {
  // console.log("Adding discount:" ,req.body);
  const vendorId = req.body.vendorId;
  const description = req.body.description;
  const startDate = req.body.startDate ? req.body.startDate : null;
  const expDate = req.body.expDate ? req.body.expDate : null;
  const discountCode = req.body.discountCode ? req.body.discountCode : null;
  const categoryId = req.body.categoryId;
  const isShown = req.body.isShown;
  const isRegional = req.body.isRegional;
  // POST sql query
  const query = `INSERT INTO "discounts"
                ("vendor_id", "description", "start_date", "expiration_date", discount_code, category_id, is_shown, is_regional)
                 VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8);`;
  pool
    .query(query, [
      vendorId,
      description,
      startDate,
      expDate,
      discountCode,
      categoryId,
      isShown,
      isRegional,
    ])
    .then((result) => {
      // send success status
      res.sendStatus(201);
    })
    .catch((err) => {
      // Log error if one occurs
      console.log("Error in POST new discount: ", err);
      res.sendStatus(500);
    });
}); // End POST new discount

// This PUT will edit an existing discount by ID number
router.put("/", rejectUnauthenticated, rejectUnauthorizedUser, (req, res) => {
  // console.log("In discount PUT with: ", req.body);
  const discountId = req.body.discountId;
  const description = req.body.description;
  const startDate = req.body.startDate;
  const expDate = req.body.expDate;
  const discountCode = req.body.discountCode;
  const query = `UPDATE "discounts"
                 SET "description"=$1,
                 "start_date"=$2,
                 "expiration_date"=$3,
                 "discount_code"=$4
                 WHERE "id"=$5;`;
  pool
    .query(query, [description, startDate, expDate, discountCode, discountId])
    .then((result) => {
      // Send success status
      res.sendStatus(200);
    })
    .catch((err) => {
      // log error and send back error code if error occurred
      console.log("Error editing discount: ", err);
      res.sendStatus(500);
    });
}); // End edit discount PUT

// Delete a discount by discount ID
router.delete(
  "/:discountid",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    // console.log("In delete a discount with: ", req.params.discountid);
    const discountId = req.params.discountid;
    const query = `DELETE FROM "discounts"
                 WHERE "id"=$1;`;
    pool
      .query(query, [discountId])
      .then((result) => {
        // Send a success status
        res.sendStatus(200);
      })
      .catch((err) => {
        // Log error and send error status if error occurs
        console.log("Error deleting a player");
        res.sendStatus(500);
      });
  }
); // End delete a discount

router.post(
  "/tracker/:discountId",
  rejectUnauthenticated,
  rejectUnauthorizedUser,
  (req, res) => {
    const discountId = req.params.discountId;
    const userId = req.user.id;
    const discountDate = req.body.discountDate;
    console.log(discountId, userId, discountDate);

    const query = `INSERT INTO "discounts_tracked" ("discount_id", "user_id", "date")
    VALUES ($1, $2, $3);`

    pool
      .query(query, [discountId, userId, discountDate])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log("Error adding to discounts_tracked", err);
        res.sendStatus(500);
      });
  }
); // End POST to discount_tracker

// export the router
module.exports = router;
