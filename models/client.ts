import { Database, aql }  from 'arangojs';
import type { ArticleData } from 'article-parser'

export const db = new Database({
  url: 'http://192.168.1.111:8529',
  databaseName: 'main',
  auth: { username: 'root', password: 'fuckgfw' },
})

export const articleCollection = db.collection<ArticleData>('articles')

export type Article = Awaited<ReturnType<typeof articleCollection.document>>

async function queryDocByUrl (url: string) {
  const r = await db.query(aql`
    for doc in ${articleCollection}
      filter doc.url == ${url}
      return doc
  `)

  const all = await r.all()

  if (all.length > 0) {
    return all[0]
  }

  return null
}
