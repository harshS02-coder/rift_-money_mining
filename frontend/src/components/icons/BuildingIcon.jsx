import React from 'react'

function BuildingIcon({ size = 20, className = '', title = 'Entity' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <path
        d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 7h2M6 11h2M6 15h2M10 7h2M10 11h2M10 15h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 21V9h-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BuildingIcon
