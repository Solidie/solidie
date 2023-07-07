import React from 'react'
import SalesTable from './segments/SalesTable.jsx';

const Sales = () => {
  return (
    <div className={"flex flex-col gap-4 w-full h-full".classNames()}>
      {/* Header */}
      <div className={"flex justify-between items-center w-full".classNames()}>
        <h1 className={"text-3xl font-bold".classNames()}>Sales</h1>
      </div>
      {/* Apps Table */}
      <SalesTable />
    </div>
  )
}

export default Sales