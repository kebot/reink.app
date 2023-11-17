import * as trpc from '@trpc/server'
import { z } from 'zod'
import debug from 'debug'
import { getAuthToken } from 'src/app/packages/instapaper'

const log = debug('trpc:auth')

const auth = trpc.router().mutation('connectInstapaper', {
  input: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  async resolve({ input }) {
    try {
      const token = await getAuthToken(input.email, input.password)
      return { token }
    } catch (e) {
      console.log(e)
      // use with Sentry?

      throw new trpc.TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error connecting to instapaper, please check your email and password',
        cause: e,
      })
    }
  },
})

export default auth
