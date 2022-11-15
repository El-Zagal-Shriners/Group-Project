const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// This GET will return all discounts in the database
router.get("/discounts", rejectUnauthenticated, (req, res) => {
  // select all from discounts with calculated number of discount uses for 7 days, 30 days, 1 year and all time
  const query = `SELECT "discounts".*, 
	count("discounts_tracked"."id") AS "discounts_all_time", 
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '7 days') AND CURRENT_DATE) AS "7_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '30 days') AND CURRENT_DATE) AS "30_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '1 year') AND CURRENT_DATE) AS "1_year_count"
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
}); // End GET discounts

// This POST will add a new discount to the discount table
router.post('/discount', rejectUnauthenticated, (req, res) => {
  const vendorId = req.body.vendorId;
  const description = req.body.description;
  const startDate = req.body.startDate ? req.body.startDate:null;
  const expDate = req.body.expDate ? req.body.expDate:null;
  const discountCode = req.body.discountCode ? req.body.discountCode:null;
  const category = req.body.category;
  const isShown = req.body.isShown;
  const isRegional = req.body.isRegional;
  // POST sql query
  const query = `INSERT INTO "discount" ("vendor_id", "description", "start_date", "expiration_date", discount_code, category_id, is_shown, is_regional)
                 VALUES ($1, $2, $3, $4, $5, $6 ,$7, $8);`;
  pool.query(query, [vendorId, description, startDate, expDate, discountCode, category, isShown, isRegional])
      .then(result => {
          // send success status
          res.sendStatus(201);
      })
      .catch((err) => {
          // Log error if one occurs
          console.log('Error in POST new discount: ', err);
          res.sendStatus(500);
      })
}); // End POST new discount

// export the router
module.exports = router;
