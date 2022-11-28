import { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import EditUserForm from "../EditUserForm/EditUserForm";
import UserDependentConfirmation from "./UserDependentConfirmation";
import AddDependentForm from "../AddDependentForm/AddDependentForm";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.user);
  const accounts = useSelector((store) => store.accounts);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showAddDependent, setShowAddDependent] = useState(false);
  const [deleteDependent, setDeleteDependent] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showInvalid, setShowInvalid] = useState(false);
  const [showValid, setShowValid] = useState(false);
  const [duesPaid, setDuesPaid] = useState('');

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
  // Toggle local 'show' state and close the password form
  const handleShowEdit = (e) => {
    setShowEdit(true);
    handleClosePasswordForm(e);
  }
  // Toggle local 'show' state
  const handleCloseEdit = () => setShowEdit(false);
  // Toggle local 'show' state
  const handleShowDependent = () => setShowAddDependent(true);
  // Toggle local 'show' state
  const handleCloseDependent = () => setShowAddDependent(false);
  // function sends dependent id to delete to removal saga
  // then close the modal
  const removeDependent = (id, e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_DEPENDENT",
      payload: id,
    });
    handleClose();
  };

  // This function will update the user's dues paid date and toggle
  // review pending on their account to true
  const requestReview = () => {
    dispatch({
      type: "REQUEST_REVIEW",
      payload: {
        duesPaid
      }
    });
    setDuesPaid('');
  };

  // This send the current and new password to the server
  // for comparision
  const changePassword = (e) => {
    e.preventDefault();
    dispatch({
      type: "CHANGE_PASSWORD",
      payload: {
        currentPassword,
        newPassword
      },
    });
    handleClosePasswordForm(e);
  };
  // compares the entered passwords and runs
  // the function to send new password to the server
  // if they match or displays the inputs as invalid
  const handlePasswordForm = (e) => {
    e.preventDefault();
    if(newPassword===confirmNewPassword){
      changePassword(e);
    } else {
      setShowInvalid(true);
    }
  }
  // function to close the password form and clear the local states
  const handleClosePasswordForm = (e) => {
    e.preventDefault();
    setConfirmNewPassword('');
    setNewPassword('');
    setCurrentPassword('');
    setShowPasswordForm(false);
  }

    // toggle if password box should invalid or valid
  // based on the two passwords entered
  useEffect(() => {
    // Sets both valid and invalid to false if only newPassword
    // has entry or both or empty
    if (
      (!newPassword && !confirmNewPassword) ||
      (newPassword && !confirmNewPassword)
    ) {
      setShowInvalid(false);
      setShowValid(false);
      return;
    }
    // show invalid when both passwords don't match
    newPassword === confirmNewPassword
      ? setShowInvalid(false)
      : setShowInvalid(true);
    // show valid when both passwords match
    newPassword === confirmNewPassword
      ? setShowValid(true)
      : setShowValid(false);
  }, [confirmNewPassword, newPassword]);

  return (
    <>
      {/* Render NAV BAR at top of page */}
      <UpdatedNavBar />
      <div className="container col col-lg-6">
        {/* Block rendered if the is not authorized but is verified and not previously requested a review */}
        {!user.is_authorized && !user.review_pending && user.is_verified &&
          <>
          <div>
          <h4>Status: <strong className="text-primary">Unauthorized</strong></h4>
          <p>This account appears to be turned off. This may be due to unpaid dues or other reasons.
              Please entered the date you last paid your dues and use the button to request a review of
              your account standing.
          </p>
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
          <button className="btn btn-primary mb-1 text-nowrap col w-100">Request Review</button>
          </form>
          </div>
          <hr/>
          </>
          }
          {/* Block rendered if the user is not authorized but has a review already requested and previously verified */}
          {!user.is_authorized && user.review_pending && user.is_verified &&
          <>
            <h4>Status: <strong className="text-primary">Review Requested</strong></h4>
            <hr/>
          </>
          }
          {/* Block that displays if the is not authorized and not verified (new account awaiting initial approval) */}
          {!user.is_authorized && !user.is_verified &&
          <>
            <h4>Status:<br/> <strong className="text-primary">Initial Verification Pending</strong></h4>
            <p className="text-muted fst-italic">This process may take a few days. Please contact El Zagal for more information.</p>
            <hr/>
          </>
          }
        {/* Render user's basic information */}
        <h2 className="fw-bolder text-primary">
          Hi, {user.first_name} {user.last_name}!
        </h2>
        <h4 className="fw-bold text-decoration-underline text-primary">
          Current Information:
        </h4>
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
            {user.membership_number > 0 && (
              <span>
                <strong>Member Number:</strong> {user.membership_number}
              </span>
            )}
          </p>
          {/* Button to show edit modal */}
          <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary mx-1 mb-1 col" onClick={handleShowEdit}>
            {allIconComponents.editUser} Edit Info
          </button>
          {/* Toggle password form showing button */}
          {!showPasswordForm && (
            <button
              className="btn btn-outline-primary col mx-1 mb-1 text-primary text-nowrap text-decoration-underline fw-bold"
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </button>
          )}
          </div>
          {/* Password change form */}
          {showPasswordForm && (
            <div className="border border-2 border-primary rounded p-1">
              <form onSubmit={handlePasswordForm}>
                <h4 className="fw-bold mx-1 text-decoration-underline text-primary">Change Password</h4>
                <div className='d-flex justify-content-around align-items-center'>
                  <button type="submit" className="btn btn-primary col mx-1">
                    Submit
                  </button>
                  <button
                    onClick={handleClosePasswordForm}
                    className="btn btn-outline-primary col mx-1"
                  >
                    Cancel
                  </button>
                </div>
                <FloatingLabel
                  controlId="currentPassword"
                  label="Current Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    className="mx-0"
                    required
                    autoFocus
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="newPassword"
                  label="New Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    className="mx-0"
                    required
                    isInvalid={showInvalid ? true : false}
                    isValid={showValid ? true : false}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmNewPassword"
                  label="Confirm New Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    className="mx-0"
                    required
                    isInvalid={showInvalid ? true : false}
                    isValid={showValid ? true : false}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </FloatingLabel>
              </form>
            </div>
          )}
          <div className="w-100 d-flex justify-content-center"></div>
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
          {user.membership_number > 0 && (
            <>
              <h5 className=" p-0 text-primary text-center mb-0 mt-1 text-decoration-underline fw-bold d-flex justify-content-between align-items-center">
                Dependent Accounts
              </h5>
              <div
                onClick={handleShowDependent}
                className="bg-primary px-3 py-1 mt-1 text-white rounded d-flex align-items-center mb-0 mt-0 ms-3"
              >
                + Add
              </div>
            </>
          )}
          <AddDependentForm
            showAddDependent={showAddDependent}
            handleCloseDependent={handleCloseDependent}
          />
        </div>
        {accounts.accountDependents.length > 0 && user.membership_number && (
          <>
            {accounts.accountDependents.map((dependent) => (
              <div
                key={dependent.id}
                className="d-flex justify-content-between align-items-center border border-2 border-secondary p-3 m-1 rounded-3"
              >
                {/* List of dependents and their info */}
                <p className="mb-1">
                  <strong>Name:</strong> {dependent.first_name}{" "}
                  {dependent.last_name} <br />
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
        )}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
