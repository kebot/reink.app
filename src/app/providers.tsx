'use client'

import { Provider, Client, cacheExchange, fetchExchange } from 'urql'

const OMNIVORE_API_KEY = '8fade3b3-b50e-48fd-b3f2-0c78eef7c2e0'
const OMNIVORE_HOST = 'https://api-prod.omnivore.app/api/graphql'

function createClient(token: string) {
  return new Client({
    url: OMNIVORE_HOST,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { authorization: token },
      }
    },
  })
}

export function Providers ({ children }) {

  const client = createClient(OMNIVORE_API_KEY)

  return <Provider value={client}>
    {children}
  </Provider>
}