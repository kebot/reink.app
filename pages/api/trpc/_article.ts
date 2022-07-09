import * as trpc from '@trpc/server';
import { z } from 'zod';
import debug from 'debug'
import { extract } from 'article-parser'
import { db, articleCollection } from '../../../models/arangodb-client';
import { aql }  from 'arangojs';

// https://github.com/mozilla/readability

const log = debug('article')

const article = trpc.router()
  .mutation('parse', {
    input: z.object({
      url: z.string().url(),
    }),
    async resolve({ input }) {
      // Special Cases
      log('start parse %o', input)
      const doc = await extract(input.url)
      log('/parse result %o', doc)

      const savedDoc = await articleCollection.save(doc)

      return savedDoc
    }
  })
  .query('query', {
    input: z.object({}),
    async resolve({ input }) {
      const r = await db.query(aql`
        for doc in ${articleCollection}
          return doc
      `)

      return await r.all()
    }
  })

export default article