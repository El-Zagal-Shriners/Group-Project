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
          className="bg_link_opacity border border-2 border-primary"
          variant="link"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Not a Member yet? Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
