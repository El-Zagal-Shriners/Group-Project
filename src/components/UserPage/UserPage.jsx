import { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import EditUserForm from "../EditUserForm/EditUserForm";
import UserDependentConfirmation from "./UserDependentConfirmation";
import AddDependentForm from "../AddDependentForm/AddDependentForm";
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);
  const accounts = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showAddDependent, setShowAddDependent] = useState(false);
  const [deleteDependent, setDeleteDependent] =useState('');

  // Get dependents for current user on load
  useEffect(() => {
    dispatch({
      type: "GET_DEPENDENTS",
    });
  }, []);
  // Toggle local 'show' state
  const handleShow = (id) => {
    console.log('This is id in handleShow: ', id);
    setDeleteDependent(id);
    setShow(true);
  }
  // Toggle local 'show' state
  const handleClose = () => setShow(false);
  // Toggle local 'show' state
  const handleShowEdit = () => setShowEdit(true);
  // Toggle local 'show' state
  const handleCloseEdit = () => setShowEdit(false);
  // Toggle local 'show' state
  const handleShowDependent = () => setShowAddDependent(true);
  // Toggle local 'show' state
  const handleCloseDependent = () => setShowAddDependent(false);
  // function sends dependent id to delete to removal saga
  // then close the modal
  const removeDependent = (id) => {
    dispatch({
      type: "REMOVE_DEPENDENT",
      payload: id
    });
    handleClose();
  }

  return (
    <>
      {/* Render NAV BAR at top of page */}
      <UpdatedNavBar />
      <div className="container">
        {/* Render user's basic information */}
        <h2 className="fw-bolder">
          Hi, {user.first_name} {user.last_name}!
        </h2>
        <h4 className="fw-bold">Current Information:</h4>
        <div className="d-flex-column align-items-center">
          <p className="mb-1 ">
            First Name: {user.first_name}
            <br />
            Last Name: {user.last_name}
            <br />
            Username: {user.username}
            <br />
            Email: {user.email}
            <br />
            Member Number: {user.membership_number}
          </p>
          <button className="btn btn-info mb-1" onClick={handleShowEdit}>
            {allIconComponents.editUser} Edit Info
          </button>
          <EditUserForm
            user={user}
            showEdit={showEdit}
            handleCloseEdit={handleCloseEdit}
            handleShowEdit={handleShowEdit}
          />
        </div>
        {/* Render list of dependents if any */}
        <div className="d-flex justify-content-between align-items-center">
          {/* <h6 className="text-decoration-underline mb-0 fw-bold" onClick={handleShowDependent}>
            Dependent Accounts<span className="badge badge-primary">{allIconComponents.add}</span>
          </h6> */}
          {/* Button to add a dependent */}
          {/* Hide add button for dependent accounts */}
          {user.membership_number &&
          <button className="btn btn-primary mb-0 fw-bold text-secondary d-flex justify-content-between align-items-center" onClick={handleShowDependent}>
           Dependent Accounts&nbsp;&nbsp;{allIconComponents.plusSign}
          </button>}
          <AddDependentForm
            showAddDependent={showAddDependent}
            handleCloseDependent={handleCloseDependent}
          />
        </div>
        {accounts.accountDependents.length > 0 ? (
          <>
            {accounts.accountDependents.map((dependent) => (
              <div
                key={dependent.id}
                className="d-flex justify-content-between align-items-center"
              >
                <p className="mb-1">
                  Name: {dependent.first_name} {dependent.last_name} <br />
                  Username: {dependent.username}
                  <br /> Email: {dependent.email}
                </p>
                <button
                  onClick={() => handleShow(dependent.id)}
                  className="btn btn-outline-danger"
                >
                  {allIconComponents.delete}
                </button>
                {/* Modal to confirm dependent delete */}
                <UserDependentConfirmation
                  show={show}
                  removeDependent={removeDependent}
                  dependentId={deleteDependent}
                  handleClose={handleClose}
                />
              </div>
            ))}
          </>
        ) : (
          // Display message if there is no dependents for the account
          <p>No dependent accounts</p>
        )}
        {/* Render logout button */}
        <LogOutButton className="btn btn-outline-warning" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
