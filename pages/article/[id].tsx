import { NextPageContext } from 'next'
import debug from 'debug'
import { articleCollection } from '../../models/client'
import { ArticleData } from 'article-parser'
import { Container, Text } from '@nextui-org/react'

const log = debug('article.ssr')

const ArticleView = ({ id, doc }: { id: string; doc: ArticleData }) => {
  if (!doc) {
    return <div>no article for {id}</div>
  }

  return (
    <Container>
      <Text h2>{doc.title}</Text>

      <article
        dangerouslySetInnerHTML={{
          __html: doc.content || '',
        }}
      ></article>
    </Container>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  // debug('article.ssr')('id', ctx.query.id)

  try {
    log('getDoc', ctx.query.id)

    const doc = await articleCollection.document(ctx.query.id as string)

    log('getDoc finish', doc.url)

    return {
      props: { id: ctx.query.id, doc },
    }
  } catch (e) {
    console.error(e)
    return { props: { id: ctx.query.id as string, doc: null } }
  }
}

export default ArticleView
