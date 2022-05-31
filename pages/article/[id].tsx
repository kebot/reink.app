import { NextPageContext } from 'next'
import debug from 'debug'
import { articleCollection } from 'models/client'
import { ArticleData } from 'article-parser'
import { htmlToPortableText } from 'models/html2portabletext'
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'

const log = debug('article.ssr')

const ArticleView = ({
  id,
  doc,
  portableText,
}: {
  id: string
  doc: ArticleData
  portableText: PortableTextBlock[]
}) => {
  const usePortable = false

  if (!doc) {
    return <div>no article for {id}</div>
  }

  return (
    <div
      className='container p-4 mx-auto font-serif prose h-screen overflow-scroll'
      style={{
        columns: '393px 1',
        columnGap: 32
      }}

      onClick

    >
      <h2>{doc.title}</h2>

      {!usePortable && (
        <div
          dangerouslySetInnerHTML={{
            __html: doc.content || '',
          }}
        ></div>
      )}

      {usePortable && (
        <div className='grid grid-cols-2'>
          <div className='card prose'>
            <PortableText value={portableText} />
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  // debug('article.ssr')('id', ctx.query.id)

  try {
    log('getDoc', ctx.query.id)

    const doc = await articleCollection.document(ctx.query.id as string)

    log('getDoc finish', doc.url)

    return {
      props: {
        id: ctx.query.id,
        doc,
        portableText: htmlToPortableText(doc.content || ''),
      },
    }
  } catch (e) {
    console.error(e)
    return { props: { id: ctx.query.id as string, doc: null } }
  }
}

export default ArticleView
