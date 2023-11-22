import { useMemo } from 'react'
import { NextPageContext } from 'next'
import debug from 'debug'
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { trpc } from 'utils/trpc'
import { Pager } from 'src/packages/pager'
import { useGlobalConfig } from 'src/packages/useSettings'
import clsx from 'clsx'
import { PageNav } from './PageNav'

const log = debug('ArticleView')

const ArticleView = ({ id }: { id: string }) => {
  log('render')
  const [config] = useGlobalConfig()

  const { data, isLoading, isError } = trpc.useQuery(
    [
      'instapaper.getText',
      {
        bookmarkId: id,
      },
    ],
    {
      enabled: !!id,
    }
  )

  const content = useMemo(() => {
    return parse(data || '', {
      replace: (domNode: any) => {
        if (domNode.type === 'tag' && domNode?.name === 'a') {
          // console.dir(domNode, { depth: 1 })
          return <span className='underline'>{domToReact(domNode.children)}</span>
        }
      },
    })
  }, [data])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!content) {
    return <div>no article found</div>
  }

  return (
    <Pager menu={<PageNav />}>
      <main
        className={clsx(
          'prose',
          {
            'prose-sm': config.fontSize === 0,
            'prose-base': config.fontSize === 1,
            'prose-lg': config.fontSize === 2,
            'prose-xl': config.fontSize === 3,
            'prose-2xl': config.fontSize === 4,
          },
          {
            'font-sans': config.fontFamily === 'sans',
            'font-serif': config.fontFamily === 'serif',
          },
          'prose-neutral text-justify'
        )}
      >
        {content}
      </main>
    </Pager>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const log = debug('article.ssr')

  try {
    log('getDoc', ctx.query.id)
    const [type, id] = (ctx.query.id as string)?.split('-')

    return {
      props: { type, id },
    }
  } catch (e) {
    console.error(e)
    return { props: { id: ctx.query.id as string, doc: null } }
  }
}

export default ArticleView
