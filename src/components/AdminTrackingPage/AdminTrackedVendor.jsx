function AdminTrackedVendor({ allVendors, currentSelected }) {
  return (
    <div className="border border-primary border-2 rounded px-3 mt-3 w-100">
      <h5 className="text-center w-100 mt-1">
        Vendor:&nbsp;
        <span className="text-primary fw-bold">
          {
            allVendors[
              allVendors.findIndex(
                (item) => Number(item.id) === Number(currentSelected)
              )
            ]?.name
          }
        </span>
      </h5>
    </div>
  );
}

export default AdminTrackedVendor;
