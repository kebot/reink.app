/* eslint-disable @next/next/no-img-element */
'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { SearchQuery } from 'src/packages/omnivore/gql/graphql'
import { useQuery } from 'urql'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'

// endpoints,
const searchQuery = graphql(/* GraphQL */ `
  query Search($after: String, $first: Int, $query: String) {
    me {
      id
      name
      profile {
        id
        username
      }
    }

    filters {
      ... on FiltersSuccess {
        filters {
          id
          name
          filter
          position
          visible
          defaultFilter
        }
      }
      ... on FiltersError {
        errorCodes
      }
    }

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

// quit fun TypeScript exercise
// I'm sure there's better solution
type SearchResult = SearchQuery['search']

type SearchSuccess = Extract<SearchResult, { __typename?: 'SearchSuccess' }>
type SearchEdges = SearchSuccess['edges']

type FiltersSuccess = Extract<SearchQuery['filters'], { __typename?: 'FiltersSuccess' }>

const Filters: React.FC<{
  filters: FiltersSuccess['filters']
}> = ({ filters }) => {
  const searchParams = useSearchParams()
  const queryFilter = searchParams?.get('query') || filters[0].filter
  const router = useRouter()

  return (
    <div className='block space-x-2 space-y-2 p-2'>
      {filters.map((filter) => {
        if (!filter.visible) {
          return null
        }

        return (
          <span
            className={clsx('badge badge-lg', {
              'badge-accent': filter.filter === queryFilter,
              'text-white': filter.filter === queryFilter,
            })}
            key={filter.id}
            onClick={
              () => {
                router.push(`/?query=${filter.filter}`)
              }
            }

          >
            {filter.name}
          </span>
        )
      })}
    </div>
  )
}

const ArticleList: React.FC<{
  edges: SearchEdges
  username: string
}> = ({ edges, username }) => {
  return (
    <div>
      <div className='divide-y hover:cursor-pointer'>
        {edges.map((edge) => {
          const { slug, title, description, savedAt, siteName, author, siteIcon, image } = edge.node

          return (
            <Link
              className='block px-2 focus:bg-gray-100 hover:bg-gray-100'
              key={slug}
              href={`/read/${username}/${slug}`}
            >
              <div className='py-2 flex justify-between' key={slug}>
                <div>
                  <h3 className='font-sans font-bold text-lg text-primary'>{title}</h3>

                  <p className='font-serif text-primary'>{description}</p>

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
      </div>
    </div>
  )
}

const App = () => {
  const searchParams = useSearchParams()
  const queryFilter = searchParams?.get('query') || 'in:inbox'

  const [{ data, fetching }] = useQuery({
    query: searchQuery,
    variables: {
      first: 10,
      after: '0',
      query: queryFilter,
    },
  })

  return (
    <div className='container mx-auto'>
      <h1 className='normal-case text-4xl text-center py-4 font-black'>ᚱᛖᛁᚾᚲ</h1>

      {fetching && (
        <div className='flex items-center justify-center'>
          <span className='loading loading-bars loading-lg'></span>
        </div>
      )}

      {data?.search.__typename === 'SearchSuccess' &&
        data?.filters.__typename === 'FiltersSuccess' && (
          <div>
            <Filters filters={data?.filters.filters} />

            <ArticleList username={data?.me?.profile?.username || ''} edges={data?.search.edges} />

            <div>Total: {data?.search.pageInfo.totalCount}</div>
          </div>
        )}
    </div>
  )
}

export default App
