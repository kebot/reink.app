import { useMemo } from 'react'
import { NextPageContext } from 'next'
import debug from 'debug'
import parse, { domToReact, attributesToProps } from 'html-react-parser'
import { trpc } from 'utils/trpc'
import { Pager } from 'packages/pager'
import Link from 'next/link'
import { ChevronLeftIcon, HeartIcon, ArchiveIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'

const log = debug('ArticleView')

// TODO more button -> open in browser
// TODO more button -> share (web share api)

const PageNav = () => {

  return <div className='btm-nav border absolute bottom-0 left-0 right-0'>
    <Link href='/'>
      <a title='home'>
        <ChevronLeftIcon className='h-6 w-6' />
      </a>
    </Link>

    <button title='like'>
      <HeartIcon className='h-6 w-6' />
      <HeartIconSolid className='h-6 w-6' />
    </button>
    
    <button title='font'>
      Aa
    </button>

    <button title='archive'>
      <ArchiveIcon className='h-6 w-6' />
    </button>

    <button title='more'>
      <DotsVerticalIcon className='h-6 w-6' />
    </button>
  </div>
}

const ArticleView = ({ id }: { id: string }) => {
  log('render')

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
      <main className='prose prose-neutral text-justify font-serif'>{content}</main>
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
