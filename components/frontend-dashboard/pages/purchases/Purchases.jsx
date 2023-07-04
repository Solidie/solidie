import React from 'react'
import AppDetailCards from './AppDetailCards.jsx'

const PurchasedApps = () => {
  return (
    <div className="flex flex-col space-y-6 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Purchased Applications</h1>
      </div>
      <AppDetailCards />
    </div>
  )
}

export default PurchasedApps