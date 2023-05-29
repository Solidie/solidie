import React from 'react'
import InventoryTable from '../../components/inventory/InventoryTable.jsx'
import { Link } from 'react-router-dom'

const Inventory = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Link to="add" ><div className='Button'>Add New</div></Link>
      </div>
      {/* Apps Table */}
      <InventoryTable />
    </div>
  )
}

export default Inventory