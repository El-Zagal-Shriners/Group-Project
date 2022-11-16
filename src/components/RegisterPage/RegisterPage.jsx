import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center landing_page_size">
      <RegisterForm />

      <center>
        <Button
          className="bg_link_opacity"
          variant="link"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
