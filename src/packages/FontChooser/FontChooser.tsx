import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'

// preload list of fonts from Google Fonts
import { Noto_Serif_SC } from 'next/font/google'
import { Noto_Sans_SC } from 'next/font/google'

import { Bars3BottomLeftIcon, Bars3Icon } from '@heroicons/react/24/outline'

const serifSC = Noto_Serif_SC({
  display: 'swap',
  weight: '400',
  preload: false,
})

const sansSC = Noto_Sans_SC({
  display: 'swap',
  weight: '400',
  preload: false,
})

const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']

// line-heights
const leadings = [
  'leading-tight',
  'leading-snug',
  'leading-normal',
  'leading-relaxed',
  'leading-loose',
]

const fonts = {
  // system default
  Sans: 'font-fans',
  Serif: 'font-serif',

  // only available for Chinese font
  思源黑: sansSC.className,
  思源宋: serifSC.className,
}

export const FontChooser = () => {
  const [config, setConfig] = useGlobalConfig()

  return (
    <div className='border bg-base-100 fixed left-0 right-0 bottom-16 p-2 space-y-2'>
      <div className='flex justify-between align-middle'>
        <div className='btn-group gap-4 space-x-1'>
          {Object.entries(fonts).map(([name, font]) => (
            <button
              key={font}
              className={clsx('btn btn-outline', {
                'font-sans': config.fontFamily === 'sans',
                'font-serif': config.fontFamily === 'serif',
                'btn-active': config.fontFamily === font,
              })}
              onClick={() => setConfig('fontFamily', font as any)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className='flex justify-between'>
        <div>
          {leadings.map((leading) => {
            return (
              <button
                key={leading}
                className={clsx('btn btn-ghost', {
                  'btn-outline': config.leading === leading,
                })}
                onClick={() => {
                  setConfig('leading', leading)
                }}
              >
                {leading.replace('leading-', '')}
              </button>
            )
          })}
        </div>
        <div>
          <div className='form-control'>
            <label className='label cursor-pointer space-x-1'>
              <span className='label-text'>
                <Bars3BottomLeftIcon className='w-4 h-4' />
              </span>
              <input
                type='checkbox'
                className='toggle'
                checked={config.justify}
                onChange={(v) => {
                  setConfig('justify', v.target.checked)
                }}
              />
              <span className='label-text'>
                <Bars3Icon className='w-4 h-4' />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <input
          type='range'
          min='0'
          max='4'
          value={config.fontSize}
          className='range'
          step='1'
          onChange={(e) => {
            if (e.target.value) setConfig('fontSize', Number(e.target.value))
          }}
        />
        <div className='w-full flex justify-between px-2'>
          {fontSizes.map((size, index) => {
            return (
              <span key={size} className={`${size}`}>
                {size.replace('text-', '')}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
