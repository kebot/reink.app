import React, { useEffect, useRef } from 'react'
import debug from 'debug'
import renderMathInElement from 'katex/contrib/auto-render'
const log = debug('block/span')


/**
 * not a good idea to load katex every time, maybe use splitAtDelimiters function before include the whole library
 * https://github.com/KaTeX/KaTeX/blob/3d5de92fb0d0511ac64901bb60b5d46c5677eb28/contrib/auto-render/splitAtDelimiters.js
 */
export function Span({ children, ...props }: React.ComponentProps<'span'>) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (typeof children === 'string' && ref.current) {
      try {
        renderMathInElement(ref.current, {
          macros: {
            '\\hfill': '',
            '\\upvarepsilon': '',
          },
        })
      } catch (e) {
        log('Can not render', children, e)
      }
    }
  }, [children, ref])

  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  )
}
