import "./Nav.css";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function UpdatedNavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogOut() {
    dispatch({ type: "UNSET_ALL" });
    dispatch({ type: "LOGOUT", payload: { history } });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className="shadow-sm">
      <Container className="pb-0">
        <Navbar.Brand className="w-75" href="#home">
          <img
            className="shriner_logo"
            src="https://www.elzagal.org/wp-content/themes/ElZagal/images/logo.png"
            alt="El Zagal Shriner Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="bg-primary rounded-pill"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="fs-4 text-primary" href="#discounts">
              Discounts
            </Nav.Link>
            <Nav.Link className="fs-4 text-primary" href="#user">
              Profile
            </Nav.Link>
            {user.admin_level > 0 && (
              <Nav.Link className="fs-4 text-primary" href="#admin">
                Admin
              </Nav.Link>
            )}
            <Nav.Link className="fs-4 text-nowrap text-primary" onClick={handleLogOut}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UpdatedNavBar;
