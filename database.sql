CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(80) NOT NULL,
	"last_name" varchar(80) NOT NULL,
	"email" varchar(500) NOT NULL,
	"primary_member_id" bigint NOT NULL,
	"access_allowed" BOOLEAN NOT NULL DEFAULT 'false',
	"dues_paid" BOOLEAN NOT NULL DEFAULT 'false',
	"membership_number" int,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "vendors" (
	"id" serial NOT NULL,
	"name" varchar(1000) NOT NULL,
	"address" varchar(1000),
	"city" varchar(80) NOT NULL,
	"state_code" varchar(2) NOT NULL,
	"zip" int(5),
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
	CONSTRAINT "discounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" serial(255) NOT NULL,
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



CREATE TABLE "events" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"location" varchar(1000) NOT NULL,
	"date" DATE NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("primary_member_id") REFERENCES "user"("id");


ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk0" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id");
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");


ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk0" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id");
ALTER TABLE "discounts_tracked" ADD CONSTRAINT "discounts_tracked_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
