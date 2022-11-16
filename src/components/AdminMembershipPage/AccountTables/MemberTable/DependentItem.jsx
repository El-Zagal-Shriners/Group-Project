import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function DependentItem({dependent}) {
    return (
        <ListGroup.Item className="p-1 w-100">
            <ListGroup horizontal>
                <ListGroup.Item className="col-2 text-center">
                {dependent.first_name}
                </ListGroup.Item>
                <ListGroup.Item className="col-2 text-center">
                {dependent.last_name}
                </ListGroup.Item>
                <ListGroup.Item className="col-3 text-center">
                {dependent.membership_number}
                </ListGroup.Item>
                <ListGroup.Item className="col-2 text-center">
                {/* {dues} */}
                </ListGroup.Item>
                <ListGroup.Item className="col"></ListGroup.Item>
            </ListGroup>
        </ListGroup.Item>
    );
}

export default DependentItem;