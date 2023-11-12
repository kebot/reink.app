'use client'

import { graphql } from '../../packages/omnivore/gql'
import { useQuery, Client, cacheExchange, fetchExchange } from 'urql'

// endpoints,
const homePageQuery = graphql(/* GraphQL */ `
  query Viewer { 
      me { id name }
  }
`)

const App = () => {
  const [{ data }] = useQuery({
    query: homePageQuery,
    variables: {},
  })

  return <div>{JSON.stringify(data)}</div>
}

export default App
