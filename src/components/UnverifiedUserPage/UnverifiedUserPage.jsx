import UpdatedNavBar from "../Nav/Nav";

function UnverifiedUserPage() {
    return (
      <div>
        <UpdatedNavBar />
        <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 rounded-3 shadow-lg mb-3 bg-primary">
          <h2 className="text-light fw-bold text-center">New Account Verification</h2>
          <h4 className="fw-bold text-secondary">Verification Pending</h4>
          <p className="border border-2 border-primary p-3 rounded bg-light">
            Your new account is still under intial verification. This process may take a couple days to complete.
          </p>
        </div>
      </div>
    );
}

export default UnverifiedUserPage;