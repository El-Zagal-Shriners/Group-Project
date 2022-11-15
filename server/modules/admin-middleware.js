const rejectNonAdministrator = (req, res, next) => {
  // Check if user is administrator
  if (req.user.admin_level > 0) {
    // If any level of administrator, then continue on middleware
    // May need to add layers of administrative rights in stretch
    next();
  } else {
    // If not an admin, forbidden
    res.sendStatus(403);
  }
}; // End rejectNonAdministrator

module.exports = { rejectNonAdministrator };
