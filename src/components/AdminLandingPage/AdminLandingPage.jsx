import UpdatedNavBar from "../Nav/Nav";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

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
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title text-primary">Manage Shriner Members</h5>
          <p class="card-text">
            Administrative access to member's portal information. Administrator
            can update, edit, remove or delete member and dependent portal
            access.
          </p>
          <Button onClick={manageMembers}> Manage Members </Button>
        </div>
      </div>
      <br />
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title text-primary">Discount Manager</h5>
          <p class="card-text">
            Administrative access to discount portal information. Administrator
            can update, edit, remove or delete company and discount information.
          </p>
          <Button onClick={manageDiscounts}> Manage Discounts </Button>
        </div>
      </div>
      <br />
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title text-primary">Discount Tracker</h5>
          <p class="card-text">
            Administrative access to discount portal information. Administrator
            can update, edit, remove or delete company and discount information.
          </p>
          <Button onClick={manageDiscounts}> Manage Discounts </Button>
        </div>
      </div>
      {/* <h2> Manage Members</h2>
      <h2> Manage Discounts</h2>
      <h2>Discount Tracker</h2> */}
    </>
  );
}

export default AdminLandingPage;
