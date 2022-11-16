-- Database should be named: el_zagal_shriners

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(80) NOT NULL,
	"last_name" varchar(80) NOT NULL,
	"email" varchar(500) NOT NULL,
	"primary_member_id" bigint NOT NULL,
	"is_authorized" BOOLEAN NOT NULL DEFAULT 'false',
	"is_verified" BOOLEAN NOT NULL DEFAULT 'false',
	"review_pending" BOOLEAN NOT NULL DEFAULT 'false',
	"dues_paid" DATE,
	"membership_number" int,
	"admin_level" int NOT NULL DEFAULT '0',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "vendors" (
	"id" serial NOT NULL,
	"name" varchar(1000) NOT NULL,
	"address" varchar(1000),
	"city" varchar(100) NOT NULL,
	"state_code" varchar(2) NOT NULL,
	"zip" numeric(5,0),
	CONSTRAINT "vendors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "discounts" (
	"id" serial NOT NULL,
	"vendor_id" bigint NOT NULL,
	"description" varchar(1000) NOT NULL,
	"start_date" DATE,
	"expiration_date" DATE,
	"discount_code" varchar(255),
	"category_id" int NOT NULL,
	"is_shown" BOOLEAN NOT NULL DEFAULT 'true',
	"is_regional" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "discounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon_class" varchar(255) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "discounts_tracked" (
	"id" serial NOT NULL,
	"discount_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"date" DATE NOT NULL,
	CONSTRAINT "discounts_tracked_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "location" (
	"id" serial NOT NULL,
	"city" varchar(100) NOT NULL,
	"state_code" varchar(2) NOT NULL,
	"lng" DECIMAL NOT NULL,
	"lat" DECIMAL NOT NULL,
	CONSTRAINT "location_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("primary_member_id") REFERENCES "user"("id");

-- DOUBLE CHECK THAT THE "DELETE ON CASCADE" IS WORKING AS INTENDED || Tested working in Postico
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk0" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE CASCADE;
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

-- DOUBLE CHECK THAT THE "DELETE ON CASCADE" IS WORKING AS INTENDED || Tested working in Postico
ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk0" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE CASCADE;
ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");



-- SAMPLE CITIES
INSERT INTO "location" ("city", "state_code", "lng", "lat")
VALUES ('Fargo', 'ND', '-96.789803', '46.877186'),
('Jamestown', 'ND', '-98.708534', '46.909538'),
('Detroit Lakes', 'MN', '-95.848160', '46.827316'),
('Bismarck', 'ND', '-100.778275', '46.825905'),
('Mandan', 'ND', '-100.889580', '46.826660'),
('Ada', 'MN', '-96.515346', '47.299689'),
('Valley City', 'ND', '-98.003159', '46.923313');

-- SAMPLE CATEGORIES
INSERT INTO "categories" ("name", "icon_class")
VALUES
						('Restaurants', 'MdFastfood'),
						('Bars/Drinks', 'BiBeer'),
						('Sports', 'MdSportsBaseball'),
						('Entertainment', 'FaTicketAlt'),
						('Lodging', 'MdHotel'),
						('Shopping', 'FaShoppingCart'),
						('Rentals', 'MdCarRental'),
						('Health/Beauty', 'CgPill'),
						('Misc.', 'RiCheckboxBlankCircleLine');
						

--Gets all discounts with counter of uses for all-time, 7 days, 30 days and 1 year
SELECT "discounts".*,
	count("discounts_tracked"."id") AS "discounts_all_time",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '7 days') AND CURRENT_DATE) AS "7_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '30 days') AND CURRENT_DATE) AS "30_day_count",
	count(*) FILTER (WHERE "discounts_tracked"."date" BETWEEN (CURRENT_DATE - INTERVAL '1 year') AND CURRENT_DATE) AS "1_year_count"
	FROM "discounts"
	JOIN "discounts_tracked" ON "discounts_tracked"."discount_id"="discounts"."id"
	GROUP BY "discounts_tracked"."discount_id", "discounts"."id"
	ORDER BY "discounts"."id";

--Sample discounts
INSERT INTO "public"."discounts"("id","vendor_id","description","start_date","expiration_date","discount_code","category_id","is_shown","is_regional")
VALUES
(2,1,E'Discount A',NULL,NULL,NULL,1,TRUE,FALSE),
(3,1,E'Discount B',NULL,NULL,NULL,1,TRUE,FALSE),
(4,2,E'Discount X',NULL,NULL,NULL,1,TRUE,FALSE),
(5,2,E'Discount Y',NULL,NULL,NULL,1,TRUE,FALSE),
(6,3,E'Discount T',NULL,NULL,NULL,1,TRUE,FALSE),
(7,3,E'Discount S',NULL,NULL,NULL,1,TRUE,FALSE);

--Sample discount tracking
INSERT INTO "public"."discounts_tracked"("id","discount_id","user_id","date")
VALUES
(1,2,2,E'2022-10-14'),
(2,3,2,E'2022-11-14'),
(3,4,2,E'2022-12-14'),
(4,5,2,E'2022-11-01'),
(5,6,2,E'2022-08-14'),
(6,7,2,E'2020-02-14'),
(7,2,2,E'2022-11-14'),
(8,2,2,E'2022-06-14'),
(9,3,2,E'2022-11-14'),
(10,3,2,E'2022-08-14'),
(11,7,2,E'2021-12-14');

--Sample Vendors
INSERT INTO "public"."vendors"("id","name","address","city","state_code","zip")
VALUES
(1,E'ABC',E'123 Some St',E'Fargo',E'ND',58104),
(2,E'XYZ',E'541 Other St',E'West Fargo',E'ND',58078),
(3,E'Test Company',E'777 Wrong St',E'Moorhead',E'MN',56560);