import 'highlight.js/styles/default.css'
import 'highlight.js/styles/grayscale.css'
import React, { HTMLAttributes } from 'react'
import clsx from 'clsx'

export function Code({ children, ...props }: React.ComponentProps<'code'>) {
  return (
    <code {...props} className={clsx(props.className, 'theme-grayscale')}>
      {children}
    </code>
  )
}
