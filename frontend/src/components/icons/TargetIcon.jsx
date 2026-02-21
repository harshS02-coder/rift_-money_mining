import React from 'react'

function TargetIcon({ size = 20, className = '', title = 'Target' }) {
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
        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

export default TargetIcon
