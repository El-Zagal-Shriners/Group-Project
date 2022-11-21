import { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import EditUserForm from "../EditUserForm/EditUserForm";
import UserDependentConfirmation from "./UserDependentConfirmation";
import AddDependentForm from "../AddDependentForm/AddDependentForm";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);
  const accounts = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showAddDependent, setShowAddDependent] = useState(false);
  const [deleteDependent, setDeleteDependent] = useState("");

  // Get dependents for current user on load
  useEffect(() => {
    dispatch({
      type: "GET_DEPENDENTS",
    });
  }, []);
  // Toggle local 'show' state
  // and store dependent id of account to delete
  const handleShow = (id) => {
    setDeleteDependent(id);
    setShow(true);
  };
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
      payload: id,
    });
    handleClose();
  };

  return (
    <>
      {/* Render NAV BAR at top of page */}
      <UpdatedNavBar />
      <div className="container col col-lg-6">
        {/* Render user's basic information */}
        <h2 className="fw-bolder text-primary">
          Hi, {user.first_name} {user.last_name}!
        </h2>
        <h4 className="fw-bold text-decoration-underline text-primary">Current Information:</h4>
        <div className="d-flex-column align-items-center">
          <p className="mb-1 ">
            <strong>First Name:</strong> {user.first_name}
            <br />
            <strong>Last Name:</strong> {user.last_name}
            <br />
            <strong>Username:</strong> {user.username}
            <br />
            <strong>Email:</strong> {user.email}
            <br />
            {user.membership_number && <span><strong>Member Number:</strong> {user.membership_number}</span>}
          </p>
          {/* Button to show edit modal */}
          <button className="btn btn-primary mb-2" onClick={handleShowEdit}>
            {allIconComponents.editUser} Edit Info
          </button>
          <div className="w-100 d-flex justify-content-center">
          <LogOutButton className="btn btn-primary mt-2 col col-lg-6" />
        </div>
          <hr />
          {/* Edit user information modal */}
          <EditUserForm
            user={user}
            showEdit={showEdit}
            handleCloseEdit={handleCloseEdit}
            handleShowEdit={handleShowEdit}
          />
        </div>
        {/* Render list of dependents if any */}
        <div className="d-flex align-items-center justify-content-center">
          {/* Hide dependent accounts list if dependent account */}
          {user.membership_number &&
          <>
          <h5 className=" p-0 text-primary text-center mb-0 mt-2 text-decoration-underline fw-bold d-flex justify-content-between align-items-center">
           Dependent Accounts
          </h5>
          <div onClick={handleShowDependent} className="bg-primary px-3 py-1 mt-2 text-white rounded d-flex align-items-center mb-0 mt-0 ms-3">+ Add</div>
          </>}
          <AddDependentForm
            showAddDependent={showAddDependent}
            handleCloseDependent={handleCloseDependent}
          />
        </div>
        {accounts.accountDependents.length > 0 && user.membership_number &&
          <>
            {accounts.accountDependents.map((dependent) => (
              <div
                key={dependent.id}
                className="d-flex justify-content-between align-items-center border border-2 border-secondary p-3 m-1 rounded-3"
              >
                {/* List of dependents and their info */}
                <p className="mb-1">
                  <strong>Name:</strong> {dependent.first_name} {dependent.last_name} <br />
                  <strong>Username:</strong> {dependent.username}
                  <br /> <strong>Email:</strong> {dependent.email}
                </p>
                {/* Delete a dependent button */}
                <button
                  onClick={() => handleShow(dependent.id)}
                  className="text-danger border-0 bg-white fs-2"
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
        }
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
