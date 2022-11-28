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
              How do I add a discount?
            </div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary outline-warning">
              The admin can add a discount through 'Discount Manager'. Admin clicks on the 'Add Discount' button, selects vendor from dropdown, fills in required inputs for discount infomration, seletcs  
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
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
        <Accordion.Item>
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
        <Accordion.Item eventKey="5"></Accordion.Item>
        <Accordion.Item eventKey="1">
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
        <Accordion.Item eventKey="6">
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
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            <div className="text-primary fw-bold">Can I give a member administrative access?</div>
          </Accordion.Header>
          <br/>
          <Accordion.Body>
            <div className="text-primary">
             Yep! By clicking on the member in 'Manage Members', the current admin can grant access to administrative capabilities 
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default FaqAdmin;