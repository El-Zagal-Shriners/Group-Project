import {useHistory} from 'react-router-dom';
import UpdatedNavBar from '../Nav/Nav';
function RequestReviewPage() {
    const history = useHistory();
    const requestReview = () => {
        return;
    }
    return (
        <div className='w-100'>
            <UpdatedNavBar />
            <div className="container col col-lg-6 d-flex flex-column align-items-center p-3 rounded-3 shadow-lg mb-3 bg-primary">
                <h1 className="text-light fw-bold">Inactive Status</h1>
                <h4 className="fw-bold text-secondary">Request Review</h4>
                <p className="border border-2 border-primary p-3 rounded bg-light">Your account may be turned off for past dues or other reasons. If you recently made a payment or have another reason your account should be re-authorized, please use the button below to request your account status be reviewed.</p>
                <button className="shadow-md btn btn-primary border border-light" onClick={requestReview}>Request Review</button>
            </div>
        </div>
    )
}

export default RequestReviewPage;