import React from 'react'
import { Button } from "../components/common/index.js"
import InventoryTable from '../components/inventory/table.jsx'

const Inventory = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button>Add New</Button>
      </div>
      {/* Apps Table */}
      <InventoryTable />
    </div>
  )
}

export default Inventory