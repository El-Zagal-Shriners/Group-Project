import Accordion from "react-bootstrap/Accordion";
import UpdatedNavBar from "../Nav/Nav";

function FaqAdmin() {
  return (
    <>
      <UpdatedNavBar />
      <h1 className="d-flex justify-content-center text-primary">Admin FAQ</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="text-primary fw-bold">
              Can an Admin update a member's status?
            </div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary outline-warning">
              Yes! By clicking on 'Manage Members', the Admin can approve new
              member's access, activate or deactive members and their
              dependents, and view a list of all members, dependents, and their
              status!
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="text-primary fw-bold">
              How does an Admin add a new discount?
            </div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary">
              Once inside 'Manage Discounts', the Admin simply clicks on "Add
              Discount", selects the vendor's name from the dropdown, inputs the
              discount information on the form, selects what category the
              discount belongs in and clicks "Add Discount"
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="text-primary fw-bold">Can I remove a discount?</div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary">
              You know it! By simply clicking on the discount, the Admin can
              edit, delete, and even turn off the discount if they want to keep
              its use for later!
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="text-primary fw-bold">Can I remove a vendor?</div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary">
              The Admin can simply click on that vendors name and remove that
              vendors information along with its discounts.
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <div className="text-primary fw-bold">
              What if a vendor wants to honor the discount at more than one location?
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="text-primary">
              No Problem! If a vendor wants to honor the discount at more than one location, the admin can simply toggle between 'This Location' for the specific location, or 'Regional' if it's allowed at more than one location
            </div>
          </Accordion.Body>
          <br/>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <div className="text-primary fw-bold">Are disconts tracked?</div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary">
              Absolutely! The admin can view how many times a discount has been
              revealed to a member in the last 7 days, past month, past year,
              and all-time!
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default FaqAdmin;
