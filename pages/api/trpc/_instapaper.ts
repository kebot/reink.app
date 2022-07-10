import * as trpc from '@trpc/server'
import { createClient, OAUTH_TOKEN } from 'packages/instapaper'
import { z } from 'zod'
import debug from 'debug'
import type { Context } from './_context'

const log = debug('instapaper')

type Metadata = {
  type: 'meta'
}

type User = {
  type: 'user',
  username: string;
  user_id: number;
  subscription_is_active: '0' | '1';
}

type Bookmark = {
  type: 'bookmark';
  hash: string;
  description: string;
  bookmark_id: number;
  private_source: string;
  title: string;
  url: string;
  progress_timestamp: number;
  time: number;
  progress: number;
  starred: string;
}

type ListResponse = (Bookmark | User | Metadata)[]

const instapaper = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    if (typeof ctx.instapaperToken !== 'string') {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const token = JSON.parse(ctx.instapaperToken)

    if (!(token.key && token.secret)) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
      ctx: {
        ...ctx,
        client: createClient(token as OAUTH_TOKEN)
      }
    })
  })
  .query('list', {
    input: z.object({
      limit: z.number().int().positive().optional(),
      folder_id: z.string().optional(), // value from /api/1.1/folders/list || 'unread' 'starred' 'archive'
      have: z.string().optional(),
      highlights: z.string().optional(),
    }).nullish(),
    async resolve({ input, ctx }): Promise<ListResponse> {
      return await ctx.client.list(input) as ListResponse
    },
  })
  .query('getText', {
    input: z.object({
      bookmarkId: z.string()
    }),
    async resolve({ input, ctx }): Promise<string> {
      return await ctx.client.getText(input.bookmarkId)
    }
  })

export default instapaper
