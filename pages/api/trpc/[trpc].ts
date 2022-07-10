import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import debug from 'debug'
import auth from './_auth'
import instapaper from './_instapaper'
import { createContext, Context } from './_context'

const log = debug('trpc')

export const appRouter = trpc
  .router<Context>()
  .query('ping', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      log('/hello %o', input)
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('auth.', auth)
  // @TODO fix type here
  .merge('instapaper.', instapaper as unknown as any)

export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
