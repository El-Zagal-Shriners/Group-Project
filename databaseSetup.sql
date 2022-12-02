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
	"website_url" varchar(1000),
	CONSTRAINT "vendors_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "discounts" (
	"id" serial NOT NULL,
	"vendor_id" bigint NOT NULL,
	"discount_description" varchar(1000) NOT NULL,
	"discount_summary" varchar(15) NOT NULL,
	"start_date" DATE,
	"expiration_date" DATE,
	"discount_usage" varchar(255) NOT NULL,
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

CREATE TABLE "dependent_tokens" (
	"id" serial NOT NULL,
	"primary_member_id" bigint NOT NULL,
	"token" varchar(75) NOT NULL,
	"email" varchar(50) NOT NULL,
	CONSTRAINT "dependent_tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "password_tokens" (
	"id" serial NOT NULL,
	"token" varchar(75) NOT NULL,
	"email" varchar(50) NOT NULL,
	"primary_member_id" bigint NOT NULL,
	CONSTRAINT "password_tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- Password token alter statement
ALTER TABLE "password_tokens" ADD CONSTRAINT "password_tokens_fk0" FOREIGN KEY ("primary_member_id") REFERENCES "user"("id");

-- Use this after adding dependent tokens table
ALTER TABLE "dependent_tokens" ADD CONSTRAINT "dependent_tokens_fk0" FOREIGN KEY ("primary_member_id") REFERENCES "user"("id");

ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("primary_member_id") REFERENCES "user"("id");

-- DOUBLE CHECK THAT THE "DELETE ON CASCADE" IS WORKING AS INTENDED || Tested working in Postico
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk0" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE CASCADE;
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

-- DOUBLE CHECK THAT THE "DELETE ON CASCADE" IS WORKING AS INTENDED || Tested working in Postico
ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk0" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE CASCADE;
ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
