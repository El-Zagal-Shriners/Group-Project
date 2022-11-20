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

  function addVendor() {
    history.push("/adminaddvendor");
  }

  function addDiscount() {
    history.push("/adminadddiscount");
  }

  // three bootstrap cards that direct the adminstrator to make changes
  //to membership information, discounts, and track discounts
  return (
    <>
      <UpdatedNavBar />
      <h2 className="text-primary container text-center">
        Admin Landing Page
      </h2>{" "}
      <br />
      <div className="card-body">
        <div className="container text-center">
          <h5 className="card-title text-primary">Manage Shriner Members</h5>{" "}
          <br />
          <p className="card-text">
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
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Add Vendor</h5> <br />
          <p className="card-text">
            Administrative access to add vendor information.
          </p>
          <Button
            size="lg"
            variant="outline-primary"
            onClick={addVendor}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Add Vendor
          </Button>
        </div>
      </div>
      <br />
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Add Discount</h5> <br />
          <p className="card-text">
            Administrative access to add discount information.
          </p>
          <Button
            size="lg"
            variant="outline-primary"
            onClick={addDiscount}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Add Discount
          </Button>
        </div>
      </div>
      <br />
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Discount Manager</h5> <br />
          <p className="card-text">
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
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Discount Tracker</h5> <br />
          <p className="card-text">
            Administrative access to discount tracker. Administrator can view,
            reset, and delete discount tracker.
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
    </>
  );
}

export default AdminLandingPage;

//onClick={manageDiscounts
