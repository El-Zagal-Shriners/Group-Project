import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function PasswordResetPage(){
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showInvalid, setShowInvalid] = useState(false);
    const [showValid, setShowValid] = useState(false);
    // function to submit the new password
    const submitReset = (e) => {
        e.preventDefault();
    }
    // toggle if password box should invalid or valid
    // based on the two passwords entered
    useEffect(() => {
        if ((!newPassword && !confirmNewPassword) || (newPassword && !confirmNewPassword)){
            setShowInvalid(false);
            setShowValid(false);
            return;
        }
        newPassword===confirmNewPassword?setShowInvalid(false):setShowInvalid(true);
        newPassword===confirmNewPassword?setShowValid(true):setShowValid(false);
    }, [confirmNewPassword, newPassword]);
    return (
        <form
        className="d-flex flex-column align-items-center p-5 rounded-3 border border-2 border-primary shadow-lg mb-3"
        onSubmit={submitReset}
      >
        <h2 className="text-primary">Reset Password</h2>
        <div>
          <FloatingLabel
            controlId="newPasswordInput"
            label="New Password"
            className={`mb-1 text-primary`}
          >
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              placeholder="New Password"
              required
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </FloatingLabel>
  
          <FloatingLabel
            controlId="floatingFirstName"
            label="Confirm New Password"
            className="mb-1 text-primary"
          >
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              placeholder="Confirm New Password"
              required
              isInvalid={showInvalid?true:false}
              isValid={showValid?true:false}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </FloatingLabel>
        </div>
        <div>
          <input
            className="btn btn-primary"
            type="submit"
            name="submitBtn"
            value="Submit"
          />
        </div>
      </form>
    )
}

export default PasswordResetPage;