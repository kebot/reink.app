/* eslint-disable @next/next/no-img-element */
import { graphql } from 'src/packages/omnivore/gql'
import { Loading } from 'src/components/Loading'
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'urql'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { range } from 'lodash'

const SearchQuery = graphql(/* GraphQL */ `
  query Search($after: String, $first: Int, $query: String) {
    search(after: $after, first: $first, query: $query) {
      ... on SearchSuccess {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          totalCount
        }
        edges {
          cursor
          node {
            title
            slug
            description
            url
            savedAt
            siteName
            siteIcon
            image
            author

            language
            subscription
            isArchived
            labels {
              name
            }
          }
        }
      }
    }
  }
`)

const ArticleList: React.FC<{
  username: string
  after: string
  first: number
  query: string
  handleLoadMore: (() => void) | undefined
}> = ({ username, after, first, query, handleLoadMore }) => {
  const [{ data, fetching }] = useQuery({
    query: SearchQuery,
    variables: {
      after,
      first,
      query,
    },
    requestPolicy: 'cache-and-network'
  })

  if (fetching) {
    return <Loading />
  }

  if (data && data.search.__typename === 'SearchSuccess') {
    const edges = data.search.edges

    return (
      <div>
        <div className='divide-y hover:cursor-pointer'>
          {edges.map((edge) => {
            const { slug, title, description, savedAt, siteName, author, siteIcon, image } =
              edge.node

            return (
              <Link
                className='block px-2 focus:bg-gray-100 hover:bg-gray-100'
                key={slug}
                href={`/read/${username}/${slug}`}
              >
                <div className='py-2 flex justify-between' key={slug}>
                  <div>
                    <h3 className='font-sans font-bold text-lg text-primary'>{title}</h3>

                    <p className='font-serif text-primary line-clamp-3'>{description}</p>

                    <div className='font-mono text-sm font-thin text-primary'>
                      <span>{formatDistanceToNow(new Date(savedAt))}</span>

                      <span> | </span>

                      {siteIcon && (
                        <img
                          src={siteIcon}
                          className='w-4 h-4 inline-block grayscale'
                          alt={siteName || ''}
                        />
                      )}

                      <span> </span>

                      <span>{siteName}</span>

                      {author && <span> | {author}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}

          {handleLoadMore && data.search.pageInfo.hasNextPage && (
            <button className='btn btn-block my-4' onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    )
  }
}

const ITEM_PER_PAGE = 10

export const ArticleSearchList: React.FC<{ username: string }> = ({ username }) => {
  const searchParams = useSearchParams()
  const queryFilter = searchParams?.get('query') || 'in:inbox'

  const [pageIndex, setPageIndex] = useState<number>(1)

  useEffect(() => {
    setPageIndex(1)
  }, [queryFilter])

  return (
    <>
      {range(0, pageIndex).map((i) => {
        return (
          <ArticleList
            key={`${queryFilter}-${i}`}
            after={`${i * ITEM_PER_PAGE}`}
            first={ITEM_PER_PAGE}
            query={queryFilter}
            username={username}
            handleLoadMore={i === pageIndex - 1 ? () => setPageIndex(pageIndex + 1) : undefined}
          />
        )
      })}
    </>
  )
}
