const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool
    .query('SELECT * FROM "user" WHERE id = $1', [id])
    .then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        //SQL for checking is current user's primary user is_authorized = true
        const query = `SELECT "is_authorized" FROM "user" WHERE "id"=$1;`;
        pool.query(query, [user.primary_member_id])
            .then((result)=>{
              if (result.rows[0].is_authorized && user.is_authorized){
                user.full_authorized = true;
              } else {
                user.full_authorized = false;
              }
              done(null, user);
            })
            .catch(err=>{
              console.log('Error in checking user authorization: ', err);
            })
        // done takes an error (null in this case) and a user
        // done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    })
    .catch((error) => {
      console.log("Error with query during deserializing user ", error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    pool
      .query('SELECT * FROM "user" WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and a user
          done(null, user);
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and a user (also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null);
        }
      })
      .catch((error) => {
        console.log("Error with query for user ", error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  })
);

module.exports = passport;
