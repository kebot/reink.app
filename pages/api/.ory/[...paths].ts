// @ory/integrations offers a package for integrating with NextJS.
import { config, createApiHandler } from '@ory/integrations/next-edge'
import debug from 'debug'

debug('Ory')('ORY_SDK_URL', process.env.ORY_SDK_URL)

// We need to export the config.
export { config }

// And create the Ory Cloud API "bridge".
export default createApiHandler({
  fallbackToPlayground: true,
})
