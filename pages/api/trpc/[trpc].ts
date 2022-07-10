import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import debug from 'debug'
import instapaper from './_article'
import auth from './_auth'

const log = debug('trpc')

export const appRouter = trpc
  .router()
  .query('ping', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      log("/hello %o", input)
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .merge('auth.', auth)
  .merge('article.', instapaper)

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
