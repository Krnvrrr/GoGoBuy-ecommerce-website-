import React from 'react'

export default function Alert({notify}) {
  return (notify &&
    <div className={`p-4 mb-4 text-sm text-${notify.type}-800 rounded-lg bg-blue-50 dark:bg-green-300Name dark:text-${notify.type}-400`} role="alert">
  <span className="font-medium">{notify.content}</span>
</div>
  )
}
