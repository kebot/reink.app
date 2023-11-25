import { useState } from 'react'
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
import React, { HTMLAttributes } from 'react'
import { ArrowTopRightOnSquareIcon, BookmarkIcon } from '@heroicons/react/24/outline'

export function Link({ children, ...props }: React.ComponentProps<'a'>) {
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
        {children}
      </a>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className='space-x-2 bg-white shadow-xs border border-current p-2'
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

            <div className="whitespace-nowrap max-w-xs truncate text-gray-500 text-xs pb-1 pl-[4px]">{props.href}</div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}
