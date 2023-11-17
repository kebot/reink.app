import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, HeartIcon, ArchiveIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { FontChooser } from 'src/packages/FontChooser'

// FontChooser
// TODO more button -> open in browser
// TODO more button -> share (web share api)

const LikeButton = () => {
  return (
    <button title='like'>
      <label className='swap' htmlFor='like'>
        <input type='checkbox' />
        <HeartIcon className='swap-off h-6 w-6' />
        <HeartIconSolid className='swap-on h-6 w-6' />
      </label>
    </button>
  )
}

export const PageNav = () => {
  type Panel = 'font' | 'more' | undefined
  const [panel, setPanel] = useState<Panel>(undefined)

  return (
    <>
      {panel === 'font' && <FontChooser />}
      <div className='btm-nav border'>
        <Link title='home' href='/'>
          <ChevronLeftIcon className='h-6 w-6' />
        </Link>

        <LikeButton />

        <button
          title='font-serif'
          onClick={() => {
            if (panel === 'font') {
              setPanel(undefined)
            } else {
              setPanel('font')
            }
          }}
        >
          Aa
        </button>

        <button title='archive'>
          <ArchiveIcon className='h-6 w-6' />
        </button>

        <button title='more'>
          <DotsVerticalIcon className='h-6 w-6' />
        </button>
      </div>
    </>
  )
}
