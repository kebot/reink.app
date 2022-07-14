import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : '/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      headers () {
        // natively on client, cookies are passed by default, but not on server
        const cookie = ctx?.req?.headers?.cookie
        return { cookie }
      }
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp)
