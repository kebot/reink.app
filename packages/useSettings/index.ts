import { useLocalStorageValue } from '@react-hookz/web'

type AppConfig = {
  fontSize: number
  fontFamily: 'serif' | 'sans'
}

const defaultValue: AppConfig = {
  fontSize: 1,
  fontFamily: 'serif',
}

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
