import React from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import Button from "react-bootstrap/Button";

function LandingPage() {
  // Setup router variable
  const history = useHistory();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center landing_page_size">
      <h2 className="title_spacing vw-100 mx-3 text-center text-primary fw-bold p-4 bg-light bg-opacity-75 border-top border-bottom border-1 border-primary">
        El Zagal Shriners
        <br /> Membership Portal
      </h2>
      <Button
        className="col-9 col-lg-6 mb-3 landing_buttons"
        variant="primary"
        onClick={() => history.push("/login")}
      >
        Login
      </Button>
      <Button
        className="col-9 col-lg-6 mb-3 landing_buttons"
        variant="primary"
        onClick={() =>
          (window.location.href = "https://www.elzagal.org/events/")
        }
      >
        Upcoming Events
      </Button>
      <Button className="bg_link_opacity" href="#registration" variant="link">
        Register (Shriner Members only)
      </Button>
    </div>
  );
}

export default LandingPage;
