'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { useQuery } from 'urql'
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { Pager } from 'src/packages/pager'
import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'
import { PageNav } from './PageNav'

// is sanitize-html needed here?

const ArticleQuery = graphql(/* GraphQL */ `
  query Article($username: String!, $slug: String!, $format: String!) {
    article(username: $username, slug: $slug, format: $format) {
      ... on ArticleSuccess {
        article {
          content
        }
      }
    }
  }
`)

export default function Page({ params }: { params: { slug: string; username: string } }) {
  const [{ data, fetching }] = useQuery({
    query: ArticleQuery,
    variables: {
      slug: params.slug,
      username: params.username,
      // https://github.com/omnivore-app/omnivore/blob/main/packages/api/src/resolvers/article/index.ts#L106
      // markdown, html, distiller, highlightedMarkdown
      format: 'html',
    },
  })

  const [config] = useGlobalConfig()

  if (data?.article.__typename === 'ArticleSuccess') {
    return (
      <Pager menu={<PageNav />}>
        <article
          className={clsx(
            'prose',
            {
              'prose-sm': config.fontSize === 0,
              'prose-base': config.fontSize === 1,
              'prose-lg': config.fontSize === 2,
              'prose-xl': config.fontSize === 3,
              'prose-2xl': config.fontSize === 4,
            },
            {
              'font-sans': config.fontFamily === 'sans',
              'font-serif': config.fontFamily === 'serif',
            },
            'prose-neutral text-justify max-w-none'
          )}
        >
          {parse(data?.article.article.content)}
        </article>
      </Pager>
    )
  }

  return null
}
