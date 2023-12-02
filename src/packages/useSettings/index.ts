import { useLocalStorageValue } from '@react-hookz/web'

type AppConfig = {
  fontSize: number
  fontFamily: string

  justify: boolean

  // line height
  leading: string

  // padding
  padding: string

  columns: number
}

const defaultValue: AppConfig = {
  fontSize: 2,
  fontFamily: 'serif',
  justify: false,
  leading: 'leading-normal',
  padding: 'p-4',
  columns: 1
}

/**
 * save user settings in localStorage
 */
export const useGlobalConfig = (): [
  AppConfig,
  (key: keyof AppConfig, value: AppConfig[typeof key]) => void,
  () => void
] => {
  const [config, setConfig, clearConfig] = useLocalStorageValue('config-v1', defaultValue)

  return [
    { ...defaultValue, ...config },
    (key, value) => {
      const newValue = { ...defaultValue, ...config, [key]: value }
      setConfig(newValue)
    },
    clearConfig
  ]
}
