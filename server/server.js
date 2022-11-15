const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const citiesRouter = require("./routes/cities.router");
const accountsRouter = require("./routes/accounts.router");
const discountsRouter = require("./routes/discounts.router");
const vendorRouter = require("./routes/vendor.router");
const categoriesRouter = require("./routes/categories.router");
const dependentRegistration = require('./routes/dependentRegistration.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/discounts", discountsRouter);
app.use("/api/vendors", vendorRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/register/dependent", dependentRegistration);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
