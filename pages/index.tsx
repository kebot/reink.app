// import { trpc } from 'utils/trpc'
import { COOKIE_NAME_INSTAPAPER_TOKEN } from 'utils/auth'
import { getCookie, hasCookie } from "cookies-next";
import { GetStaticProps } from 'next';

const App = () => {
  return <div className="container mx-auto">
    <div className="font-mono">
      reink (dot) app prototype, build 
    </div>

  </div>
}

export const getServerSideProps: GetStaticProps = ({ req, res }) => {
  const hasInstapaperCookie = hasCookie(COOKIE_NAME_INSTAPAPER_TOKEN, { req, res })

  if (!hasInstapaperCookie) {
    return {
      redirect: {
        destination: '/auth/connect',
      }
    }
  }

  return {
    props: {}
  }
}

export default App
