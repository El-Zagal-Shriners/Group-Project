import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

function DependentItem({ dependent }) {
  const dispatch = useDispatch();
  // add remove function.
  const removeDependent = () => {
    dispatch({
      type: "ADMIN_DELETE_MEMBER",
      payload: {
        memberId: dependent.id,
      },
    });
  };

  return (
    <ListGroup.Item className="border-0 p-0 w-100">
      <ListGroup horizontal>
        <ListGroup.Item className="col-4 text-center">
          {dependent.first_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-4 text-center">
          {dependent.last_name}
        </ListGroup.Item>
        <ListGroup.Item className="col text-center">
          <Button onClick={() => removeDependent()}>Remove</Button>
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
}

export default DependentItem;
