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
    history.push("/admintracking")
  }

  return (
    <>
      <UpdatedNavBar />
      <h2 className="text-primary container text-center">
        Admin Landing Page
      </h2>{" "}
      <br />
        <div class="card-body">
        <div class="container text-center">
          <h5 class="card-title text-primary">Manage Shriner Members</h5> <br/>
          <p class="card-text">
            Administrative access to member's portal information. Administrator
            can update, edit, remove or delete member and dependent portal
            access.
          </p>
          <Button
          size="lg"
          variant="outline-primary"
          onClick={manageMembers}
          className="me-2 d-flex justify-content-center container text-center"
        >
          Manage Members
          </Button>
        </div>
      </div>
      <br />
      <div class="container text-center">
        <div class="card-body">
          <h5 class="card-title text-primary">Discount Manager</h5> <br/>
          <p class="card-text">
            Administrative access to discount portal information. Administrator
            can update, edit, remove or delete company and discount information.
          </p>
          <Button
          size="lg"
          variant="outline-primary"
          onClick={manageDiscounts}
          className="me-2 d-flex justify-content-center container text-center"
        >
          Manage Discounts
          </Button>
        </div>
      </div>
      <br />
      <div class="container text-center">
        <div class="card-body">
          <h5 class="card-title text-primary">Discount Tracker</h5> <br/>
          <p class="card-text">
            Administrative access to discount tracker. Administrator can view, reset, and delete discount tracker.
          </p>
          <Button
          size="lg"
          variant="outline-primary"
          onClick={discountTracker}
          className="me-2 d-flex justify-content-center container text-center"
        >
          Track Discounts
          </Button>
        </div>
      </div>
      {/* <h2> Manage Members</h2>
      <h2> Manage Discounts</h2>
      <h2>Discount Tracker</h2> */}
    </>
  );
}

export default AdminLandingPage;

//onClick={manageDiscounts
