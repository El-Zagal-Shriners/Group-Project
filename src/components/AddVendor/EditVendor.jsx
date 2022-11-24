import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function EditVendor({ vendorMap }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const vendors = useSelector((store) => store.vendors);
  const vendor = vendors.find((vend) => vend.id)

  const removeVendor = (vendorId) => {
    dispatch({
      type: "REMOVE_VENDOR",
      payload: vendorId,
    });
    history.push("/admindiscounts");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
  }, []);

  return (
    <>
      <h1>{vendorMap.name}</h1>
      <Button variant="warning" onClick={(event) => removeVendor(vendorMap.id)}>
        Remove
      </Button>
    </>
  );
}

export default EditVendor;
