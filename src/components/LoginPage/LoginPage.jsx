import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function LoginPage() {
  const history = useHistory();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center landing_page_size">
      <LoginForm />

      <center>
        <Button
          className="bg_link_opacity"
          variant="link"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;