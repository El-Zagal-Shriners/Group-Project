import { useEffect, useState } from 'react';
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import UserDependentConfirmation from './UserDependentConfirmation';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);
  const accounts = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  
  // Get dependents for current user on load
  useEffect(() => {
    dispatch({
      type: 'GET_DEPENDENTS'
    });
  }, []);
  // Toggle local 'show' state
  const handleShow = () => setShow(true);
  // Toggle local 'show' state
  const handleClose = () => setShow(false);

  return (
    <>
      <UpdatedNavBar />
      <div className="container">
        <h2 className="fw-bolder">{user.first_name} {user.last_name}</h2>
        <div className="d-flex justify-content-between align-items-center">
        <p className="mb-1">Username: {user.username}<br />
          Email: {user.email}<br />
          Member Number: {user.membership_number}
        </p>
        <button className="btn btn-info">{allIconComponents.editUser}</button>
        </div>
          <div className="d-flex justify-content-between align-items-center">
          <h6 className="text-decoration-underline mb-0 fw-bold">Dependent Accounts</h6>
          <button className="btn btn-success">{allIconComponents.add}</button>
          </div>
        {accounts.accountDependents.length > 0 ? 
          <>
            {accounts.accountDependents.map((dependent)=>
            <div key={dependent.id} className="d-flex justify-content-between align-items-center">
              <p className="mb-1">Name: {dependent.first_name} {dependent.last_name} <br />Username: {dependent.username}<br /> Email: {dependent.email}</p>
              <button onClick={()=>handleShow(dependent.id)} className="btn btn-outline-danger">{allIconComponents.delete}</button>
              {show && <UserDependentConfirmation show={show} dependentId={dependent.id} handleShow={handleShow} handleClose={handleClose}/>}
            </div>
            )}
          </>
          :
          <p>No dependent accounts</p>}
          <LogOutButton className="btn btn-outline-warning" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
