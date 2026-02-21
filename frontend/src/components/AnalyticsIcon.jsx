import React from 'react'

function AnalyticsIcon({ size = 24, className = '', title }) {
  const ariaProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...ariaProps}
    >
      <path d="M7 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M4 5H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

export default AnalyticsIcon
