import 'highlight.js/styles/default.css'
import 'highlight.js/styles/grayscale.css'
// import 'styles/highlight-print.css'

import React from 'react'
import clsx from 'clsx'

export function Code({ children, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      {...props}
      className={clsx(
        props.className,
        'theme-grayscale',
        'indent-0',
        'inline',
        'whitespace-pre-wrap',
        'hyphens-none',
        'break-all',
        'p-0'
      )}
    >
      {children}
    </code>
  )
}
