import React from 'react'
import SubscriptionsTable from './segments/subscriptionsTable.jsx';
import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/solid'

const Subscriptions = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link to="add" ><div className='Button flex'>Add New <PlusIcon className="h-4 w-4" /></div></Link>
      </div>
      {/* Apps Table */}
      <SubscriptionsTable />
    </div>
  )
}

export default Subscriptions