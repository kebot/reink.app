import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'

// preload list of fonts from Google Fonts
import { Noto_Serif_SC } from 'next/font/google'
import { Noto_Sans_SC } from 'next/font/google'

import { Bars3BottomLeftIcon, Bars3Icon, Bars4Icon } from '@heroicons/react/24/outline'

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
  Sans: 'font-sans',
  Serif: 'font-serif',

  // only available for Chinese font
  思源黑: sansSC.className,
  思源宋: serifSC.className,
}

const paddings = ['p-1', 'p-2', 'p-4', 'p-6', 'p-8']

const PaddingSetting = () => {
  const [config, setConfig] = useGlobalConfig()

  return (
    <div>
      <span className='label-text'>padding</span>
      {paddings.map((padding) => {
        return (
          <button
            key={padding}
            className={clsx('btn btn-ghost', {
              'btn-outline': config.padding === padding,
            })}
            onClick={() => {
              setConfig('padding', padding)
            }}
          >
            {padding.replace('p-', '')}
          </button>
        )
      })}
    </div>
  )
}

const ColumnsSetting = () => {
  const [config, setConfig] = useGlobalConfig()
  return (
    <div className='form-control w-32'>
      <label className='label cursor-pointer space-x-1'>
        <span className='label-text'>
          <Bars4Icon className='w-4 h-4' />
        </span>
        <input
          type='checkbox'
          className='toggle'
          checked={config.columns === 2}
          onChange={(v) => {
            setConfig('columns', v.target.checked ? 2 : 1)
          }}
        />
        <span className='label-text scale-x-50 -translate-x-2'>
          <Bars4Icon className='w-4 h-4 inline-block' />
          <Bars4Icon className='w-4 h-4 inline-block' />
        </span>
      </label>
    </div>
  )
}

const JustifySetting = () => {
  const [config, setConfig] = useGlobalConfig()
  return (
    <div className='form-control w-32'>
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
  )
}

const FontFamilySetting = () => {
  const [config, setConfig] = useGlobalConfig()
  return (
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
  )
}

const LineHeightSetting = () => {
  const [config, setConfig] = useGlobalConfig()
  return (
    <div>
      <span className='label-text'>line height </span>
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
  )
}

const FontSizeSetting = () => {
  const [config, setConfig] = useGlobalConfig()

  return (
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
  )
}

export const FontChooser = () => {
  return (
    <div className='border bg-base-100 fixed left-0 right-0 bottom-16 p-2 space-y-2'>
      <div className='flex justify-between align-middle'>
        <FontFamilySetting />
      </div>

      <div className='flex justify-between'>
        <LineHeightSetting />

        <JustifySetting />
      </div>

      <div className='flex justify-between'>
        <PaddingSetting />
        <ColumnsSetting />
      </div>

      <FontSizeSetting />
    </div>
  )
}
