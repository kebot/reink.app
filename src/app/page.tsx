'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { useQuery } from 'urql'
import { useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Loading } from 'src/components/Loading'
import { ArticleSearchList } from './ArticleSearchList'

const FiltersQuery = graphql(/* GraphQL */ `
  query Filters {
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
  }
`)

const PageQuery = graphql(/* GraphQL */ `
  query Page {
    me {
      id
      name
      profile {
        id
        username
      }
    }
  }
`)

const Filters: React.FC = () => {
  const searchParams = useSearchParams()
  const queryFilter = searchParams?.get('query') || 'in:inbox'
  const router = useRouter()

  const [{ data, fetching }] = useQuery({
    query: FiltersQuery,
    variables: {},
    requestPolicy: 'cache-first',
  })

  if (fetching) {
    return <Loading />
  }

  if (data?.filters.__typename === 'FiltersSuccess') {
    return (
      <div className='block space-x-2 space-y-2 p-2 pb-4 sticky top-0 bg-gray-50 z-50'>
        {data?.filters.filters.map((filter) => {
          if (!filter.visible) {
            return null
          }

          return (
            <span
              className={clsx(
                'badge badge-lg cursor-pointer',
                {
                  'badge-accent': filter.filter === queryFilter,
                  'text-white': filter.filter === queryFilter,
                },
                'hover:bg-slate-50'
              )}
              key={filter.id}
              onClick={() => {
                router.push(`/?query=${filter.filter}`)
              }}
            >
              {filter.name}
            </span>
          )
        })}
      </div>
    )
  }

  return null
}

const App = () => {
  const [{ data, fetching }] = useQuery({
    query: PageQuery,
    variables: {},
  })

  return (
    <div className='container mx-auto'>
      <h1 className='normal-case text-4xl text-center py-4 font-black'>ᚱᛖᛁᚾᚲ</h1>

      <Filters />

      {data?.me && <ArticleSearchList username={data?.me?.profile?.username || ''} />}
    </div>
  )
}

export default App
