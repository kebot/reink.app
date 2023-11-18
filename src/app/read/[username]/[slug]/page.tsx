'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { useQuery } from 'urql'
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { Pager } from 'src/packages/pager'
import clsx from 'clsx'
import { useGlobalConfig } from 'src/packages/useSettings'
import { PageNav } from './PageNav'
import { formatDistanceToNow } from 'date-fns'
import sanitizeHtml from 'sanitize-html'

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

/**
 * the replace callback will replace an element with another element
 *     https://www.npmjs.com/package/html-react-parser#replace
 */
const replaceTag = (domNode: any) => {
  if (domNode.type === 'tag' && domNode?.name === 'a') {
    // external link may not work well on e-ink devices
    return <span className='underline'>{domToReact(domNode.children)}</span>
  }
}

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
    const { title, content, url, siteName, savedAt, author, id } = data?.article.article

    return (
      <Pager menu={<PageNav linkId={id} />}>
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
            {
              'text-justify': false,
            },
            'prose-neutral max-w-none'
          )}
        >
          <h1>{title}</h1>
          <p>
            {formatDistanceToNow(new Date(savedAt))} ago • {author && `${author} • `}
            <a href={url} target='_blank'>
              {siteName}
            </a>
          </p>
          {parse(
            sanitizeHtml(content, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['data-omnivore-anchor-idx']
              }
            }),
            {
              replace: replaceTag,
            }
          )}
        </article>
      </Pager>
    )
  }

  return null
}
