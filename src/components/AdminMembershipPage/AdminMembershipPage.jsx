import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import MemberTable from "./AccountTables/MemberTable/MemberTable";

function AdminMembershipPage() {
  // access to useDispatch
  const dispatch = useDispatch();

  // fetch accounts on load.
  useEffect(() => {
    dispatch({ type: "GET_ACCOUNTS" });
  }, []);

  return (
    <div className="vw-100">
      <UpdatedNavBar />
      <h5 className="text-primary fw-bold text-center mt-2">Manage Members</h5>
      {/* spot for all members
        drop down for dependents */}
      <MemberTable />
    </div>
  );
}

export default AdminMembershipPage;
