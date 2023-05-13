import React from 'react'

const Button = ({ children }) => {
  return (
    <button className="bg-tertiary text-primary font-bold text-sm px-8 py-3 rounded-full shadow-md shadow-tertiary/60 active:animate-ping active:animate-bounce">{ children }</button>
  )
}

export default Button