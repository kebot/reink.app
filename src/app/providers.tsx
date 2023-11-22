'use client'

import React from 'react'
import { Provider, Client, cacheExchange, fetchExchange } from 'urql'
import { getCookie, setCookie } from 'cookies-next'
import { COOKIE_NAME_OMNIVORE_API_KEY } from './auth/const'

function createClient() {
  return new Client({
    url: '/omnivore-proxy',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      const token = getCookie(COOKIE_NAME_OMNIVORE_API_KEY)

      if (!token) {
        if (typeof location !== 'undefined') {
          location.href = '/auth'
        } 
        return {}
      }

      return {
        headers: { authorization: token ? token : '' },
      }
    },
  })
}

export function Providers({ children }: { children: React.ReactElement }) {
  const client = createClient()
  return <Provider value={client}>{children}</Provider>
}
