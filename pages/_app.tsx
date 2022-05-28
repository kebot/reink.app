import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react';

import { withTRPC } from '@trpc/next';
// import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from './api/trpc/[trpc]';

const darkTheme = createTheme({
  type: 'light',
  theme: {
    fonts: {
      sans: "SpaceMono Nerd Font",
      // sans: '"Roboto", sans-serif',
      mono: '"Roboto Mono", monospace',
    },
    colors: {
      background: '#f9f7f1',
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp)
