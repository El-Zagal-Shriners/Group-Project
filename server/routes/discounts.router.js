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

// export the router
module.exports = router;
