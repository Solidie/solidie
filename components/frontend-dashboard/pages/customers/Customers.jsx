import React from 'react'
import CustomersTable from "./segments/CustomersTable.jsx"

const Customers = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Customers</h1>
      </div>
      {/* Apps Table */}
      <CustomersTable />
    </div>
  )
}

export default Customers