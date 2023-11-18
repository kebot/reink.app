/* eslint-disable @next/next/no-img-element */
'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { SearchQuery } from 'src/packages/omnivore/gql/graphql'
import { useQuery } from 'urql'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

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

const ArticleList: React.FC<{
  edges: SearchEdges
  username: string
}> = ({ edges, username }) => {
  return (
    <div className='divide-y hover:cursor-pointer'>
      {edges.map((edge) => {
        const { slug, title, description, savedAt, siteName, author, siteIcon, image } = edge.node

        return (
          <Link className='block px-2 focus:bg-gray-100 hover:bg-gray-100' key={slug} href={`/read/${username}/${slug}`}>
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
  )
}

const App = () => {
  const [{ data, fetching }] = useQuery({
    query: searchQuery,
    variables: {
      first: 10,
      after: '0',
      query: 'in:library',
    },
  })

  return (
    <div className='container mx-auto'>
      {fetching && <span className='loading loading-bars loading-lg'></span>}

      {data?.search.__typename === 'SearchSuccess' && (
        <div>
          <ArticleList username={data?.me?.profile?.username || ''} edges={data?.search.edges} />

          <div>Total: {data?.search.pageInfo.totalCount}</div>
        </div>
      )}

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default App
