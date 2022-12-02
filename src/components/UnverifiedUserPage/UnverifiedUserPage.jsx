import UpdatedNavBar from "../Nav/Nav";

function UnverifiedUserPage() {
  // Render a page that indicates to user that they are still a new account
  // and need to be verified by an admin
  return (
    <>
      <UpdatedNavBar />
      <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 h-100">
        <div className="text-light text-center bg-primary w-100 m-0 py-2 mb-1 rounded-2">
          <h2 className="fw-bold">New Account Verification</h2>
          <h4 className="fw-bold text-secondary">Verification Pending</h4>
        </div>
        <p className="border border-2 border-primary p-3 rounded bg-white text-center">
          Your new account is still under initial verification. This process may
          take a couple days to complete.
        </p>
      </div>
    </>
  );
}

export default UnverifiedUserPage;
