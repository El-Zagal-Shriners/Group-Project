import { useEffect } from 'react';
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { allIconComponents } from "../../allIconComponents/allIconComponents";


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const accounts = useSelector((store) => store.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_DEPENDENTS'
    });
  }, []);

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
              <button className="btn btn-outline-danger">{allIconComponents.delete}</button>
            </div>
            )}
          </>
          :
          <p>No dependent accounts!</p>}
          <LogOutButton className="btn btn-outline-warning" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
