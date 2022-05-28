// aql.ts
import { Database, aql }  from 'arangojs';
import debug from 'debug';
import { extract } from 'article-parser'

const db = new Database({
  url: 'http://192.168.1.111:8529',
  databaseName: 'main',
  auth: { username: 'root', password: 'fuckgfw' },
})

const articleCollection = db.collection('articles')

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

;(async () => {
  // const url = 'https://www.binance.com/en/blog/markets/15-new-years-resolutions-that-will-make-2022-your-best-year-yet-421499824684903249'
  const url = 'https://www.arangodb.com/docs/stable/http/general.html'
  // const article = await extract(url)
  // console.log(article)
})()
