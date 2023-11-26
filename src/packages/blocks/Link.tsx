import React from 'react'
import { ArrowTopRightOnSquareIcon, BookmarkIcon } from '@heroicons/react/24/outline'

import { Popover, PopoverTrigger, PopoverContent } from './Popover'

export function Link({ children, ...props }: React.ComponentProps<'a'>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <a href='#' className='underline'>{children}</a>
      </PopoverTrigger>
      <PopoverContent>
        <div
          className='space-x-2 bg-white shadow-xs border border-current p-2'
          onPointerUp={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div>
            <button
              className='btn btn-ghost btn-sm no-underline focus:outline-none space-x-1'
              onClick={() => window.open(props.href, '_blank')}
            >
              Open
              <ArrowTopRightOnSquareIcon className='w-4 h-4' />
            </button>

            <button className='btn btn-ghost btn-sm space-x-1'>
              Save (TODO)
              <BookmarkIcon className='w-4 h-4' />
            </button>
          </div>

          <div className='whitespace-nowrap max-w-xs truncate text-gray-500 text-xs pb-1 pl-[4px]'>
            {props.href}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
