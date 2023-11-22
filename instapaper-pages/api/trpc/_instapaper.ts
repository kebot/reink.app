import * as trpc from '@trpc/server'
import { createClient, OAUTH_TOKEN } from 'src/app/packages/instapaper'
import { z } from 'zod'
import debug from 'debug'
import type { Context } from './_context'

const log = debug('instapaper')

type Metadata = {
  type: 'meta'
}

type User = {
  type: 'user'
  username: string
  user_id: number
  subscription_is_active: '0' | '1'
}

type Bookmark = {
  type: 'bookmark'
  hash: string
  description: string
  bookmark_id: number
  private_source: string
  title: string
  url: string
  progress_timestamp: number
  time: number
  progress: number
  starred: string
}

type ListResponse = (Bookmark | User | Metadata)[]

const instapaper = trpc
  // router<Context & { client: ReturnType<typeof createClient> }>
  .router<any>()
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
        client: createClient(token as OAUTH_TOKEN),
      },
    })
  })
  .query('list', {
    input: z
      .object({
        limit: z.number().int().positive().optional(),
        folder_id: z.string().optional(), // value from /api/1.1/folders/list || 'unread' 'starred' 'archive'
        have: z.string().optional(),
        highlights: z.string().optional(),
      })
      .nullish(),
    async resolve({ input, ctx }): Promise<ListResponse> {
      return (await ctx.client.list(input)) as ListResponse
    },
  })
  .query('getText', {
    input: z.object({
      bookmarkId: z.string(),
    }),
    async resolve({ input, ctx }): Promise<string> {
      return await ctx.client.getText(input.bookmarkId)
    },
  })
  .mutation('updateReadProgress', {
    input: z.object({
      bookmark_id: z.string(),
      progress: z.number().min(0).max(1),
      progress_timestamp: z.number()
    }),
    async resolve({ input, ctx }): Promise<void> {
      // Output: The modified bookmark on success.
      return await ctx.client.updateReadProgress(input)
    }
  })
  .mutation('add', {
    input: z.object({
      url: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      folder_id: z.number().int().optional(),
      resolve_final_url: z.number().int().optional(), // Optional, default 1. Specify 1 if the url might not be the final URL that a browser would resolve when fetching it, such as if it's a shortened URL, it's a URL from an RSS feed that might be proxied, or it's likely to go through any other redirection when viewed in a browser. This will cause Instapaper to attempt to resolve all redirects itself, synchronously. This will delay the action, so please specify 0 for this parameter if you're reasonably confident that this URL won't be redirected, such as if it's already being viewed in a web browser.
    }),
    async resolve({ input, ctx }): Promise<Bookmark> {
      return await ctx.client.add(input)
    }
  })
  .mutation('star', {
    input: z.object({
      bookmark_id: z.string(),
    }),
    async resolve({ input, ctx }): Promise<[]> {
      return await ctx.client.star(input.bookmark_id)
    }
  })
  .mutation('unstar', {
    input: z.object({
      bookmark_id: z.string(),
    }),
    async resolve({ input, ctx }): Promise<[]> {
      return await ctx.client.unstar(input.bookmark_id)
    }
  })
  .mutation('archive', {
    input: z.object({
      bookmark_id: z.string(),
    }),
    async resolve({ input, ctx }): Promise<[]> {
      return await ctx.client.archive(input.bookmark_id)
    }
  })
  .mutation('unarchive', {
    input: z.object({
      bookmark_id: z.string(),
    }),
    async resolve({ input, ctx }): Promise<[]> {
      return await ctx.client.archive(input.bookmark_id)
    }
  })

export default instapaper
