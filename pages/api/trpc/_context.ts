import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getCookie } from 'cookies-next'
import { COOKIE_NAME_INSTAPAPER_TOKEN } from 'utils/auth'

export const createContext = (opts?: trpcNext.CreateNextContextOptions) => {
  if (!opts) {
    return {}
  }

  const token = getCookie(COOKIE_NAME_INSTAPAPER_TOKEN, { req: opts.req, res: opts.res })
  return {
    instapaperToken: token,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>