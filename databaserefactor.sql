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
	"description" varchar(1000) NOT NULL,
	"start_date" DATE,
	"expiration_date" DATE,
	"discount_code" varchar(255) NOT NULL,
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

-- SAMPLE USERS
INSERT INTO "user" ("username", "password", "first_name", "last_name", "email", "primary_member_id", "dues_paid", "membership_number", "admin_level")
VALUES ('johnsmith', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'John', 'Smith', 'johnsmith@gmail.com', 1, '2022/1/1', '4325346', 0),
('janesmith', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Jane', 'Smith', 'janesmith@gmail.com', 1, '2022/1/1', '4325346', 4),
('bobsmith', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Bob', 'Smith', 'bobsmith@gmail.com', 3, '2022/1/1', '4325346', 0),
('maryjane', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Mary', 'Jane', 'maryjane@gmail.com', 4, '2022/1/1', '4325346', 4),
('susansmith', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Susan', 'Smith', 'susansmith@gmail.com', 5, '2022/1/1', '4325346', 0),
('johndoe', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'John', 'Doe', 'johndoe@gmail.com', 1, '2022/1/1', '4325346', 0),
('janedoe', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Jane', 'Doe', 'janedoe@gmail.com', 7, '2022/1/1', '4325346', 4),
('bobdoe', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Bob', 'Doe', 'bobdoe@gmail.com', 1, '2022/1/1', '4325346', 0),
('maryjaney', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Mary', 'Jane', 'maryjane@gmail.com', 9, '2022/1/1', '4325346', 0),
('susandoe', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Susan', 'Doe', 'susandoe@gmail.com', 3, '2022/1/1', '4325346', 4),
('johnsmithy', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'John', 'Smith', 'johnsmith@gmail.com', 4, '2022/1/1', '4325346', 0),
('janesmither', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Jane', 'Smith', 'janesmith@gmail.com', 5, '2022/1/1', '4325346', 4),
('bobsmit', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Bob', 'Smith', 'bobsmith@gmail.com', 1, '2022/1/1', '4325346', 0),
('maryjan', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Mary', 'Jane', 'maryjane@gmail.com', 7, '2022/1/1', '4325346', 4),
('susansmi', '$2a$10$UrXwP8Jo9s3YzM/1ce8miuhKR8RnoymEzKVM5Y1yyznu5z2QRT8ky', 'Susan', 'Smith', 'susansmith@gmail.com', 9, '2022/1/1', '4325346', 0);


-- SAMPLE CITIES
INSERT INTO "location" ("city", "state_code", "lng", "lat")
VALUES ('Fargo', 'ND', '-96.789803', '46.877186'),
		('Jamestown', 'ND', '-98.708534', '46.909538'),
		('Moorhead', 'MN', '-96.7678', '46.8738'),
		('Detroit Lakes', 'MN', '-95.848160', '46.827316'),
		('Bismarck', 'ND', '-100.778275', '46.825905'),
		('Mandan', 'ND', '-100.889580', '46.826660'),
		('Ada', 'MN', '-96.515346', '47.299689'),
		('Williston', 'ND', '-103.6180', '48.1470'),
		('Valley City', 'ND', '-98.003159', '46.923313');

-- SAMPLE CATEGORIES
INSERT INTO "categories" ("name", "icon_class")
VALUES ('Restaurants', 'MdFastfood'),
		('Bars/Drinks', 'BiBeer'),
		('Sports', 'MdSportsBaseball'),
		('Entertainment', 'FaTicketAlt'),
		('Lodging', 'MdHotel'),
		('Shopping', 'FaShoppingCart'),
		('Rentals', 'MdCarRental'),
		('Misc.', 'RiCheckboxBlankCircleLine'),
		('Health/Beauty', 'CgPill');

--Sample Vendors
INSERT INTO "vendors"("name","address","city","state_code","zip")
VALUES ('Joe''s Diner', '123 Main St', 'Fargo', 'ND', '12345'),
		('Mary''s Flower Shop', '456 Elm St', 'Fargo', 'ND', '54321'),
		('John''s Barbershop', '789 Oak St', 'Jamestown', 'ND', '13579'),
		('Sam''s Grocery', '012 3rd Ave', 'Moorhead', 'MN', '24680'),
		('Anderson''s Bakery', '345 6th St', 'Ada', 'MN', '01234'),
		('Susan''s Sewing', '678 9th Ave', ' Detroit Lakes', 'MN', '98765'),
		('Mike''s Mechanic', '901 12th St', 'Mandan', 'ND', '56789'),
		('Bill''s Books', '234 15th Ave', 'Valley City', 'ND', '43210'),
		('Joe''s Pizza', '567 18th St', 'Jamestown', 'ND', '76543'),
		('Tom''s Tailor', '890 21st Ave', 'Moorhead', 'MN', '21098'),
		('Joe''s pizzeria', '123 main street', 'Bismarck', 'ND', '10001'),
		('Smith and Co', '456 first avenue', 'Bismarck', 'MN', '10003'),
		('Tom''s diner', '789 second street', 'Bismarck', 'ND', '10002'),
		('Mary''s Beauty salon', '321 third avenue', 'Fargo', 'ND', '10003'),
		('Mike''s garage', '654 fourth street', 'Fargo', 'ND', '10004'),
		('Bill''s bar', '987 fifth avenue', 'Fargo', 'ND', '10005'),
		('John''s plumbing', '741 sixth street', 'Moorhead', 'MN', '10006'),
		('Susan''s bookstore', '852 seventh avenue', 'Moorhead', 'MN', '10007'),
		('Larry''s bakery', '963 eighth avenue', 'Ada', 'MN', '10008'),
		('Carol''s restaurant', '753 ninth avenue', 'Ada', 'MN', '10009');

--Sample discounts
INSERT INTO "discounts"("vendor_id","description","start_date","expiration_date","discount_code","category_id")
VALUES (1,'10% off',NULL,NULL,'Present your ID',1),
		(1,'15% off',NULL,NULL,'Sdgljner425',1),
		(2,'20% off',NULL,NULL,'Mention Shriner',1),
		(2,'BOGO Wings',NULL,NULL,'3gh456herwg',1),
		(3,'BOGO Beer',NULL,NULL,'BOGOBEER',3),
		(3,'BOGO 50% off',NULL,NULL,'50 Off',3),
		(4,'10% off',NULL,NULL,'Present ID',5),
		(5,'15% off',NULL,NULL,'Sdgljner425',5),
		(6,'20% off',NULL,NULL,'Mention Shriner',4),
		(7,'BOGO Wings',NULL,NULL,'3gh456herwg',4),
		(8,'BOGO Beer',NULL,NULL,'BOGOBEER',6),
		(9,'BOGO 50% off',NULL,NULL,'50 Off',6),
		(10,'10% off',NULL,NULL,'Present ID',3),
		(11,'15% off',NULL,NULL,'Sdgljner425',2),
		(12,'20% off',NULL,NULL,'Mention Shriner',7),
		(12,'BOGO Wings',NULL,NULL,'3gh456herwg',7),
		(13,'BOGO Beer',NULL,NULL,'BOGOBEER',8),
		(13,'BOGO 50% off',NULL,NULL,'50 Off',8),
		(11,'10% off',NULL,NULL,'Present ID',2),
		(11,'15% off',NULL,NULL,'Sdgljner425',3),
		(12,'20% off',NULL,NULL,'Mention Shriner',4),
		(12,'BOGO Wings',NULL,NULL,'3gh456herwg',5),
		(5,'BOGO Beer',NULL,NULL,'BOGOBEER',3),
		(6,'BOGO 50% off',NULL,NULL,'50 Off',6),
		(7,'10% off',NULL,NULL,'Present ID',7),
		(8,'15% off',NULL,NULL,'Sdgljner425',7),
		(9,'20% off',NULL,NULL,'Mention Shriner',7),
		(4,'BOGO Wings',NULL,NULL,'3gh456herwg',4),
		(7,'BOGO Beer',NULL,NULL,'BOGOBEER',2),
		(8,'BOGO 50% off',NULL,NULL,'50 Off',3),
		(14,'10% off',NULL,NULL,'Present ID',4),
		(13,'15% off',NULL,NULL,'Sdgljner425',5),
		(17,'20% off',NULL,NULL,'Mention Shriner',6),
		(16,'BOGO Wings',NULL,NULL,'3gh456herwg',7),
		(12,'BOGO Beer',NULL,NULL,'BOGOBEER',2),
		(3,'BOGO 50% off',NULL,NULL,'50 Off',3);

--Sample discount tracking
INSERT INTO "discounts_tracked"("discount_id","user_id","date")
VALUES (1,2,'2022-10-14'),
		(2,2,'2022-11-14'),
		(3,2,'2021-12-14'),
		(4,2,'2021-11-01'),
		(5,2,'2022-08-14'),
		(6,2,'2021-02-14'),
		(7,2,'2022-11-14'),
		(8,2,'2022-06-14'),
		(9,2,'2021-11-14'),
		(10,2,'2022-08-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(12,2,'2022-10-14'),
		(13,2,'2022-11-14'),
		(14,2,'2021-12-14'),
		(15,2,'2021-11-01'),
		(15,2,'2022-08-14'),
		(16,2,'2021-02-14'),
		(17,2,'2022-11-14'),
		(18,2,'2022-06-14'),
		(19,2,'2021-11-14'),
		(20,2,'2022-08-14'),
		(21,2,'2021-12-14'),
		(22,2,'2021-12-14'),
		(23,2,'2021-12-14'),
		(1,2,'2022-10-14'),
		(2,2,'2022-11-14'),
		(3,2,'2021-12-14'),
		(4,2,'2021-11-01'),
		(5,2,'2022-08-14'),
		(6,2,'2021-02-14'),
		(7,2,'2022-11-14'),
		(8,2,'2022-06-14'),
		(9,2,'2021-11-14'),
		(10,2,'2022-08-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(12,2,'2022-10-14'),
		(13,2,'2022-11-14'),
		(14,2,'2021-12-14'),
		(15,2,'2021-11-01'),
		(15,2,'2022-08-14'),
		(16,2,'2021-02-14'),
		(17,2,'2022-11-14'),
		(18,2,'2022-06-14'),
		(19,2,'2021-11-14'),
		(20,2,'2022-08-14'),
		(21,2,'2021-12-14'),
		(22,2,'2021-12-14'),
		(23,2,'2021-12-14'),
		(1,2,'2022-10-14'),
		(2,2,'2022-11-14'),
		(3,2,'2021-12-14'),
		(4,2,'2021-11-01'),
		(5,2,'2022-08-14'),
		(6,2,'2021-02-14'),
		(7,2,'2022-11-14'),
		(8,2,'2022-06-14'),
		(9,2,'2021-11-14'),
		(10,2,'2022-08-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(11,2,'2021-12-14'),
		(12,2,'2022-10-14'),
		(13,2,'2022-11-14'),
		(14,2,'2021-12-14'),
		(15,2,'2021-11-01'),
		(15,2,'2022-08-14'),
		(16,2,'2021-02-14'),
		(17,2,'2022-11-14'),
		(18,2,'2022-06-14'),
		(19,2,'2021-11-14'),
		(20,2,'2022-08-14'),
		(21,2,'2021-12-14'),
		(22,2,'2021-12-14'),
		(23,2,'2021-12-14');

