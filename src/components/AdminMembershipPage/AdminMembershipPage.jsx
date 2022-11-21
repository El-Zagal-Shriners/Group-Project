import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import MemberTable from "./AccountTables/MemberTable/MemberTable";

function AdminMembershipPage() {
  // access the list of current accounts from the redux store.
  const accounts = useSelector((store) => store.accounts.accountsReducer);

  const primaries = [...accounts].filter(
    (acc) => acc.membership_number !== null
  );
  
  // access to useDispatch
  const dispatch = useDispatch();

  // fetch accounts on load.
  useEffect(() => {
    dispatch({ type: "GET_ACCOUNTS" });
  }, []);

  return (
    <div className="vw-100">
      <UpdatedNavBar />
      <h5 className="text-primary fw-bold text-center">Manage Members</h5>
      {/* spot for all members
        drop down for dependents */}
      <MemberTable members={primaries} />
    </div>
  );
}

export default AdminMembershipPage;
