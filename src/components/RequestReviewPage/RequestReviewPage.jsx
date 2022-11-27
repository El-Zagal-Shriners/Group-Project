import { useDispatch, useSelector } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
function RequestReviewPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const requestReview = () => {
    dispatch({
      type: "REQUEST_REVIEW",
    });
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
          <button className="btn btn-primary fw-bold" onClick={requestReview}>
            Request Review
          </button>
        )}
      </div>
    </>
  );
}

export default RequestReviewPage;
