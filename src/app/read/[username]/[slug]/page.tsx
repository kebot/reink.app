'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { useQuery } from 'urql'
import { Pager } from 'src/packages/pager'
import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'
import { PageNav } from './PageNav'
import { formatDistanceToNow } from 'date-fns'
import { useParseHTML } from 'src/packages/blocks'
import { TableOfContent } from 'src/packages/blocks/TOC'

const ArticleQuery = graphql(/* GraphQL */ `
  query Article($username: String!, $slug: String!, $format: String!) {
    article(username: $username, slug: $slug, format: $format) {
      ... on ArticleSuccess {
        article {
          id
          title
          content
          savedAt
          url
          siteName
          publishedAt
          savedAt
          author
        }
      }
    }
  }
`)

// TODO use this action
const SaveArticleReadingProgress = graphql(/* GraphQL */ `
  mutation SaveArticleReadingProgress($input: SaveArticleReadingProgressInput!) {
    saveArticleReadingProgress(input: $input) {
      ... on SaveArticleReadingProgressSuccess {
        updatedArticle {
          id
          readingProgressPercent
          readingProgressAnchorIndex
        }
      }
      ... on SaveArticleReadingProgressError {
        errorCodes
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

  const [contentElement, toc] = useParseHTML(
    data?.article.__typename === 'ArticleSuccess' ? data.article.article.content : undefined
  )

  const [config] = useGlobalConfig()

  if (data?.article.__typename === 'ArticleSuccess') {
    const { title, url, siteName, savedAt, author, id } = data?.article.article

    return (
      <Pager menu={<PageNav linkId={id} slug={params.slug} username={params.username} />}>
        <div className='prose'>
          <h1 className='font-sans'>{title}</h1>
          <p>
            {formatDistanceToNow(new Date(savedAt))} ago • {author && `${author} • `}
            <a href={url} target='_blank'>
              {siteName}
            </a>
          </p>
        </div>

        <TableOfContent data={toc} />

        <article
          className={clsx(
            'prose prose-gray max-w-none',

            //
            'antialiased',

            // font size
            {
              'prose-sm': config.fontSize === 0,
              'prose-base': config.fontSize === 1,
              'prose-lg': config.fontSize === 2,
              'prose-xl': config.fontSize === 3,
              'prose-2xl': config.fontSize === 4,
            },

            // e-ink style for `code` and `pre` block
            'prose-pre:bg-gray-200 prose-pre:text-black prose-code:font-mono',
            'underline-offset-2 decoration-from-font',

            // font family
            config.fontFamily,

            // line height
            config.leading,

            {
              'text-justify': config.justify,
            },
            // enable user select
            'select-text'
          )}
        >
          {contentElement}
        </article>
      </Pager>
    )
  }

  return null
}
