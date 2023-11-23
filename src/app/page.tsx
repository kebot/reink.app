'use client'

import { graphql } from 'src/packages/omnivore/gql'
import { useQuery } from 'urql'
import { useSearchParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Loading } from 'src/components/Loading'
import { ArticleSearchList } from './ArticleSearchList'
import { ArrowLeftOnRectangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { deleteCookie } from 'cookies-next'
import { COOKIE_NAME_OMNIVORE_API_KEY } from './auth/const'

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
              className={clsx('badge badge-lg cursor-pointer', {
                'badge-accent': filter.filter === queryFilter,
                'text-white': filter.filter === queryFilter,
                'hover:bg-slate-50': filter.filter !== queryFilter,
              })}
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
  const [{ data, fetching, error }] = useQuery({
    query: PageQuery,
    variables: {},
  })

  const handleLogout = () => {
    deleteCookie(COOKIE_NAME_OMNIVORE_API_KEY)
    location.reload()
  }

  return (
    <div className='container mx-auto'>
      <h1 className='normal-case text-4xl text-center py-4 font-black'>ᚱᛖᛁᚾᚲ</h1>

      <Filters />

      {data?.me && <ArticleSearchList username={data?.me?.profile?.username || ''} />}

      {error && (
        <div className='text-center space-y-4'>
          <div className='text-error'>{error?.message || 'Something wrong happen'}</div>
          <div className='space-x-4'>
            <button className='btn btn-ghost' onClick={() => location.reload()}>
              <ArrowPathIcon className='h-4 w-4' /> Reload
            </button>
            <button className='btn btn-ghost' onClick={handleLogout}>
              <ArrowLeftOnRectangleIcon className='h-4 w-4' />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
