import { useDispatch, useSelector } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaUserInjured } from "react-icons/fa";

function RequestReviewPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [duesPaid, setDuesPaid] = useState("");
  // dispatch to set the user's request review status to true
  // and update the dues paid date on their account
  const requestReview = (e) => {
    e.preventDefault();
    dispatch({
      type: "REQUEST_REVIEW",
      payload: {
        duesPaid,
      },
    });
    // resest dues paid local state to default
    setDuesPaid("");
  };
  // renders a page with messages depending on the account status
  // button and date input for user to update dues paid and request review of account
  return (
    <>
      <UpdatedNavBar />
      <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 h-100">
        <div className="text-light text-center bg-primary w-100 m-0 py-2 mb-1 rounded-2">
          <h2 className="fw-bold pt-1">Inactive Status</h2>
          {/* Block that displays for dependent accounts if the parent account
        is unauthorized but their account is authorized */}
          {!user.full_authorized && user.membership_number === null && (
            <>
            {/* Check if the user is unauthorized or the parent account is */}
            {/* BEGIN TERNARY */}
              {user.is_authorized ? (
                <>
                  <p>
                    The associated account appears to be unauthorized at this
                    time. Please have the owner of that account request an
                    account review if this status should be changed or contact
                    El Zagal Temple for more information.
                  </p>
                  <hr />
                </>
              ) : (
                <>
                  <p>
                    Your account appears to be inactive. Please contact the active
                    member your account is through or the El Zagal Temple for
                    more information.
                  </p>
                  <hr />
                </>
              )}
            </>
          )} 
          {/* END TERNARY */}
          {!user.review_pending && user.membership_number && (
            <h4 className="fw-bold text-secondary">Request Review</h4>
          )}
        </div>
        {user.review_pending && user.membership_number && !user.full_authorized && (
          <h5 className="text-primary bg-white border border-2 border-primary fw-bold p-3 rounded">
            Review has been requested
          </h5>
        )}
        {/* Conditional form if user doesn't have a reveiw requested currently */}
        {!user.review_pending && user.membership_number && !user.full_authorized && (
          <form
            onSubmit={requestReview}
            className="w-100 d-flex flex-column justify-content-around align-items-center"
          >
            <p className="border border-2 border-primary p-3 rounded bg-white text-center m-0 mb-1">
              Your account may be turned off for unpaid dues or another reason.
              If you recently made a payment or believe your account should be
              re-authorized, click the button below to request your account
              status be reviewed by an administrator.
            </p>
            <FloatingLabel
              className="mb-1 text-primary w-100"
              label="Last Dues Payment"
            >
              <Form.Control
                type="date"
                placeholder="Last Dues Payment"
                value={duesPaid}
                required
                className="col mx-0 w-100"
                onChange={(e) => setDuesPaid(e.target.value)}
              />
            </FloatingLabel>
            <button className="btn btn-primary fw-bold">Request Review</button>
          </form>
        )}
      </div>
    </>
  );
}

export default RequestReviewPage;
