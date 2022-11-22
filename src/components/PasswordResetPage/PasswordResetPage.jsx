import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function PasswordResetPage(){
    const tokenCheck = useSelector((store) => store.tokenCheck.passwordResetTokenCheck);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showInvalid, setShowInvalid] = useState(false);
    const [showValid, setShowValid] = useState(false);
    const dispatch = useDispatch();
    const { token } = useParams();
    const history = useHistory();
    // Checks if the token in the url is valid
    useEffect(() => {
        dispatch({
          type: "RESET_PASSWORD_TOKEN_CHECK",
          payload: token,
        });
        console.log('this is tokenCheck: ', tokenCheck);
      }, []);
    // function to submit the new password
    const submitReset = (e) => {
        e.preventDefault();
        if(passwordCompare()){
        dispatch({
            type: "RESET_PASSWORD",
            payload: {
              password: newPassword,
              token: token
            }
          });
          history.push('/');
        }
    }
    // compare the two passwords
    const passwordCompare = () => {
        return newPassword===confirmNewPassword?true:false;
    };
    // toggle if password box should invalid or valid
    // based on the two passwords entered
    useEffect(() => {
        // Sets both valid and invalid to false if only newPassword
        // has entry or both or empty
        if ((!newPassword && !confirmNewPassword) || (newPassword && !confirmNewPassword)){
            setShowInvalid(false);
            setShowValid(false);
            return;
        }
        // show invalid when both passwords don't match
        newPassword===confirmNewPassword?setShowInvalid(false):setShowInvalid(true);
        // show valid when both passwords match
        newPassword===confirmNewPassword?setShowValid(true):setShowValid(false);
    }, [confirmNewPassword, newPassword]);
    return (
        <form
        className="d-flex flex-column align-items-center p-5 rounded-3 border border-2 border-primary shadow-lg mb-3"
        onSubmit={submitReset}
      >
        <h2 className="text-primary">Reset Password</h2>
        {tokenCheck==='true' && <h3>VALID</h3>}
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
          <button
            className="btn btn-primary"
            type="submit">
                Submit
          </button>
      </form>
    )
}

export default PasswordResetPage;