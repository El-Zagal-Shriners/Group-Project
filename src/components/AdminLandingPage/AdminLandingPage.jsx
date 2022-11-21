import UpdatedNavBar from "../Nav/Nav";
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AdminLandingPage() {
  const history = useHistory();

  function manageMembers() {
    history.push("/adminmembership");
  }

  function manageDiscounts() {
    history.push("/admindiscounts");
  }

  function discountTracker() {
    history.push("/admintracking");
  }

  // three bootstrap cards that direct the administrator to make changes
  //to membership information, discounts, and track discounts
  return (
    <>
      <UpdatedNavBar />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="container text-center col col-lg-6">
          <h5 className="text-primary fw-bold">Manage Shriner Members</h5>
          <p>
            Activate, deactivate, approve, and remove members and their
            dependents.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={manageMembers}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Manage Members
          </Button>
        </div>
        <div className="container text-center col col-lg-6">
          <h5 className="text-primary fw-bold">Discount Manager</h5>
          <p>Add, update, and remove discounts and vendors.</p>
          <Button
            size="lg"
            variant="primary"
            onClick={manageDiscounts}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Manage Discounts
          </Button>
        </div>
        <div className="container text-center col col-lg-6">
          <h5 className="text-primary fw-bold">Discount Tracker</h5>
          <p>View information on discount usage.</p>
          <Button
            size="lg"
            variant="primary"
            onClick={discountTracker}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Track Discounts
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminLandingPage;
