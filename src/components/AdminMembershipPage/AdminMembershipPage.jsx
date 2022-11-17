import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import ApprovalTable from "./AccountTables/ApprovalTable/ApprovalTable";
import MemberTable from "./AccountTables/MemberTable/MemberTable";
import ReviewTable from "./AccountTables/ReviewTable/ReviewTable";

function AdminMembershipPage() {
  // access the list of current accounts from the redux store.
  const accounts = useSelector((store) => store.accounts.accountsReducer);
  // member accounts have member numbers and are verified.
  const members = [...accounts].filter(
    (acc) => acc.review_pending === false && acc.is_verified == true
  );
  // reviews are accounts with review pending.
  const reviews = [...accounts].filter((acc) => acc.review_pending === true);
  // approvals are accounts waiting to be authorized.
  const approvals = [...accounts].filter((acc) => acc.is_verified === false);

  // access to useDispatch
  const dispatch = useDispatch();

  // fetch accounts on load.
  useEffect(() => {
    dispatch({ type: "GET_ACCOUNTS" });
  }, []);

  return (
    <div className="vw-100">
      <UpdatedNavBar />
      <h2>Admin Membership Page</h2>
      {/* Make these Components? */}
      {/* Spot for new Members awaiting approval */}
      <ApprovalTable approvals={approvals} />
      {/* spot for current members needing review */}
      <ReviewTable reviews={reviews} />
      {/* spot for filtering members */}
      <h3>Filter: WIP</h3>
      {/* spot for all members
        drop down for dependents */}
      <MemberTable members={members} />
    </div>
  );
}

export default AdminMembershipPage;
