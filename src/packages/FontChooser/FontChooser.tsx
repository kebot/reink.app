import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'

const fontSizes = ['sm', 'base', 'lg', 'xl', '2xl']

export const FontChooser = () => {
  const [config, setConfig] = useGlobalConfig()

  return (
    <div className='border bg-base-100 fixed left-0 right-0 bottom-16'>
      <div>
        <div className='btn-group gap-4'>
          {['sans', 'serif'].map((font) => (
            <button
              key={font}
              className={clsx('btn btn-outline', {
                'font-sans': config.fontFamily === 'sans',
                'font-serif': config.fontFamily === 'serif',
                'btn-active': config.fontFamily === font,
              })}
              onClick={() => setConfig('fontFamily', font as any)}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      <div className='py-4'>
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
              <span key={size} className={`text-${size}`}>
                {size}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
