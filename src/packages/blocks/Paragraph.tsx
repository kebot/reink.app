import React from 'react'

export function Paragraph({ children, ...props }: React.ComponentProps<'p'>) {
  const [select, setSelect] = React.useState(false)

  return (
    <p {...props} 
      onClick={() => setSelect(!select)} 
      onPointerUp={(e) => e.stopPropagation()}
      // Select by Paragraph
      className={select ? '' : ''}>
      {children}
    </p>
  )
}
