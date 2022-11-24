import {useHistory} from 'react-router-dom';
function RequestReviewPage() {
    const history = useHistory();
    return (
        <div>
        <h1>Your account is currently turned off</h1>
        <button onClick={()=>history.push('/user')}>Profile</button>
        </div>
    )
}

export default RequestReviewPage;