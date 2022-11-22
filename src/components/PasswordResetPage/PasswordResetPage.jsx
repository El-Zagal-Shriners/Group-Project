import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function PasswordResetPage(){
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
            className="mb-1 text-primary"
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