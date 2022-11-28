import { useDispatch, useSelector } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function RequestReviewPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [duesPaid, setDuesPaid] = useState('');
  
  const requestReview = (e) => {
   e.preventDefault();
    dispatch({
      type: "REQUEST_REVIEW",
      payload: {
        duesPaid
      }
    });
    setDuesPaid('');
  };

  return (
    <>
      <UpdatedNavBar />
      <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 h-100">
        <div className="text-light text-center bg-primary w-100 m-0 py-2 mb-1 rounded-2">
          <h2 className="fw-bold pt-1">Inactive Status</h2>
          {!user.review_pending && (
            <h4 className="fw-bold text-secondary">Request Review</h4>
          )}
        </div>
        <p className="border border-2 border-primary p-3 rounded bg-white text-center m-0 mb-1">
          Your account may be turned off for unpaid dues or another reason. If
          you recently made a payment or believe your account should be
          re-authorized, click the button below to request your account status
          be reviewed by an administrator.
        </p>
        {user.review_pending ? (
          <h5 className="text-primary bg-white border border-2 border-primary fw-bold p-3 rounded">
            Review has been requested
          </h5>
        ) : (
          <form onSubmit={requestReview} className="w-100 d-flex flex-column justify-content-around align-items-center">
          <FloatingLabel className="mb-1 text-primary w-100" label="Last Dues Payment">
          <Form.Control
            type="date"
            placeholder="Last Dues Payment"
            value={duesPaid}
            required
            className="col mx-0 w-100"
            onChange={(e) => setDuesPaid(e.target.value)}
          />
        </FloatingLabel>
          <button className="btn btn-primary fw-bold">
            Request Review
          </button>
          </form>
        )}
      </div>
    </>
  );
}

export default RequestReviewPage;
