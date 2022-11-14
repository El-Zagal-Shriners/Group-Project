const pool = require("./pool");

const rejectUnauthorizedUser = async (req, res, next) => {
  // Declare initial setup values
  let isUserAuthorized = false;
  let currentUserInfo = {};
  // Remove password from query
  const userQueryText = `SELECT
    id,
    username,
    first_name,
    last_name,
    email,
    primary_member_id,
    is_authorized,
    is_verified,
    review_pending,
    dues_paid,
    membership_number,
    admin_level
    FROM "user" where "id" = $1;`;

  // Begin SQL pull for current user
  await pool
    .query(userQueryText, [req.user.id])
    .then((result) => {
      // Save current user to a global variable
      currentUserInfo = result.rows[0];
    })
    .catch((error) => {
      console.log("error caught in rejectUnauthorized firstQuery :>> ", error);
    });

  // Check if user has a membership number (if they do they are a Shriner, if they don't they are a dependent)
  if (currentUserInfo.membership_number) {
    // If user is a Shriner then set their authorization to their current database authorization
    isUserAuthorized = currentUserInfo.is_authorized;
  } else if (
    // Check if user is a dependent and currently authorized
    !currentUserInfo.membership_number &&
    currentUserInfo.is_authorized
  ) {
    // If a dependent and currently authorized, check if Shriner member is also authorized
    await pool
      .query(userQueryText, [currentUserInfo.primary_member_id])
      .then((result) => {
        if (result.rows[0] && result.rows[0].is_authorized) {
          isUserAuthorized = result.rows[0].is_authorized;
        }
      })
      .catch((error) => {
        console.log(
          "error caught in rejectUnauthorized secondQuery :>> ",
          error
        );
      });
  }

  // If the user was NOT switched to authorized above return 403
  if (!isUserAuthorized) {
    res.sendStatus(403);
  } else if (isUserAuthorized) {
    // If user was authorized above pass to next
    next();
  }
};

module.exports = { rejectUnauthorizedUser };
