import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdatedNavBar from '../Nav/Nav';
function RequestReviewPage() {
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const requestReview = () => {
        dispatch({
            type: "REQUEST_REVIEW"
        });
    }
    return (
      <div className="w-100">
        <UpdatedNavBar />
        <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 rounded-3 shadow-lg mb-3 bg-primary">
          <h1 className="text-light fw-bold">Inactive Status</h1>
          {!user.review_pending && <h4 className="fw-bold text-secondary">Request Review</h4>}
          <p className="border border-2 border-primary p-3 rounded bg-light">
            Your account may be turned off for past dues or other reasons. If
            you recently made a payment or have another reason your account
            should be re-authorized, please use the button below to request your
            account status be reviewed.
          </p>
          {user.review_pending ? (
            <h5 className="text-primary bg-light fw-bold p-2 rounded">
              Review has been requested
            </h5>
          ) : (
            <button
              className="shadow-md btn btn-primary border border-2 border-light"
              onClick={requestReview}
            >
              Request Review
            </button>
          )}
        </div>
      </div>
    );
}

export default RequestReviewPage;