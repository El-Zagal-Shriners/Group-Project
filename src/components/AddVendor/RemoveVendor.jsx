import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditVendorModal from "./EditVendorModal";

function RemoveVendor({ vendorMap }) {
  const history = useHistory();
  const dispatch = useDispatch();
  // grab vendors from redux
  const vendors = useSelector((store) => store.vendors);
  const vendor = vendors.find((vend) => vend.id);
  // dispatch vendor id to removal from database
  const removeVendor = (vendorId) => {
    dispatch({
      type: "REMOVE_VENDOR",
      payload: vendorId,
    });
    history.push("/admindiscounts");
  };
  // get the vendors
  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
  }, []);
  // render the edit vendor and remove vendor buttons
  return (
    <>
      <h1>{vendorMap.name}</h1>
      <EditVendorModal vendorMap={vendorMap}/>
      <Button variant="warning" onClick={(event) => removeVendor(vendorMap.id)}>
        Remove
      </Button>
    </>
  );
}

export default RemoveVendor;
