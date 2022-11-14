const pool = require("./pool");

const rejectUnauthorizedUser = async (req, res, next) => {
  // Declare initial setup values
  let isUserAuthorized = false;
  const currentUserInfo = {};
  const userQueryText = `SELECT * from "user" where "id" = $1;`;

  // Begin SQL pull for current user
  await pool
    .query(userQueryText, [req.user.id])
    .then((result) => {
      // Save current user to a global variable
      currentUserInfo = result.rows;
    })
    .catch((error) => {
      console.log("error caught in rejectUnauthorized firstQuery :>> ", error);
    });

  // Check if user has a membership number (if they do they are a Shriner, if they don't they are a dependent)
  if (!currentUserInfo.membership_number) {
    // If user is a Shriner then set their authorization to their current database authorization
    isUserAuthorized = currentUserInfo.is_authorized;
  } else if (
    currentUserInfo.membership_number &&
    currentUserInfo.is_authorized
  ) {
    // If a dependent and currently authorized, check if Shriner member is also authorized
    await pool
      .query(userQueryText, [currentUserInfo.primary_member_id])
      .then((result) => {
        isUserAuthorized = result.rows.is_authorized;
      })
      .catch((error) => {
        console.log(
          "error caught in rejectUnauthorized secondQuery :>> ",
          error
        );
      });
  }

  if (!isUserAuthorized) {
    res.sendStatus(403);
  } else if (isUserAuthorized) {
    next();
  }
};

module.exports = { rejectUnauthorizedUser };
