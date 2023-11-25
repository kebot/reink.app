import { useState } from 'react'
import { domToReact, attributesToProps, Element } from 'html-react-parser'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  useFocus,
} from '@floating-ui/react'

import { ArrowTopRightOnSquareIcon, BookmarkIcon } from '@heroicons/react/24/outline'

export const Link: React.FC<{ node: Element }> = ({ node }) => {
  const props = attributesToProps(node.attribs)
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(2), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  })

  // interactions
  const click = useClick(context)
  const dismiss = useDismiss(context, { bubbles: false })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss ])

  const headingId = useId()

  return (
    <>
      <a
        className='underline'
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: (e) => {
            e.preventDefault()
            e.stopPropagation()
          },

          onPointerUp: (e) => {
            e.preventDefault()
            e.stopPropagation()
          },
        })}
      >
        {domToReact(node.children)}
      </a>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className='space-x-2 rounded-box bg-white border shadow-xs'
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
            onPointerUp={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div>
              <button className='btn btn-ghost btn-sm no-underline focus:outline-none space-x-1' onClick={() => window.open(props.href, '_blank')}>
                Open
                <ArrowTopRightOnSquareIcon className='w-4 h-4' />
              </button>

              <button className='btn btn-ghost btn-sm space-x-1'>
                Save (TODO)
                <BookmarkIcon className='w-4 h-4' />
              </button>
            </div>

            <div className="whitespace-nowrap max-w-xs truncate text-gray-400 text-xs pb-1">{props.href}</div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}
