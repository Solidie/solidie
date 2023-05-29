import React from 'react'
import SubscriptionsTable from '../components/subscriptions/subscriptionsTable.jsx'
import { Link } from 'react-router-dom'

const Subscriptions = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link to="add" ><div className='Button'>Add New</div></Link>
      </div>
      {/* Apps Table */}
      <SubscriptionsTable />
    </div>
  )
}

export default Subscriptions