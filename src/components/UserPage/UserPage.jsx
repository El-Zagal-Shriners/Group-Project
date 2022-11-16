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
        <h2>Welcome, {user.first_name} {user.last_name}!</h2>
        <div className="d-flex justify-content-between align-content-around">
        <p>Username: {user.username}<br />
          Email: {user.email}<br />
          Member Number: {user.membership_number}
        </p>
        <button className="btn btn-info">{allIconComponents.editUser}</button>
        </div>
        {accounts.accountDependents.length > 0 && 
          <>
          <h2>Dependent Accounts</h2>
            {accounts.accountDependents.map((dependent)=>
            <div className="d-flex justify-content-between align-content-around">
              <p>Name: {dependent.first_name} {dependent.last_name} <br />Username: {dependent.username}<br /> Email: {dependent.email}</p>
              <button className="btn btn-outline-danger">{allIconComponents.delete}</button>
            </div>
            )}
          </>}
          <LogOutButton className="btn btn-outline-warning" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
