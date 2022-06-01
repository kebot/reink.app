import { useCallback, useEffect, useRef, useState } from 'react'
import { NextPageContext } from 'next'
import debug from 'debug'
import { articleCollection } from 'models/client'
import { ArticleData } from 'article-parser'
import { htmlToPortableText } from 'models/html2portabletext'
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'

const log = debug('ArticleView')

const ArticleView = ({
  id,
  doc,
  portableText,
}: {
  id: string
  doc: ArticleData
  portableText: PortableTextBlock[]
}) => {
  const usePortable = false
  const PAGE_GAP = 32

  const frameRef = useRef<HTMLDivElement>(null)

  const [[currentPage, totalPage], setPage] = useState<[number, number]>([0, 1])

  useEffect(() => {
    if (!frameRef.current) {
      return
    }
    const node = frameRef.current

    const totalPage = Math.round(
      (node.scrollWidth - node.offsetWidth) / node.offsetWidth + 1
    )

    setPage([0, totalPage])
  }, [frameRef, setPage])

  const nextPage = useCallback(() => {
    if (currentPage >= totalPage - 1) {
      setPage([totalPage - 1, totalPage])
    } else {
      setPage([currentPage + 1, totalPage])
    }
  }, [currentPage, totalPage])

  const prevPage = useCallback(() => {
    if (currentPage <= 0) {
      setPage([0, totalPage])
    } else {
      setPage([currentPage - 1, totalPage])
    }
  }, [currentPage, totalPage])

  useEffect(() => {
    if (!frameRef.current) {
      return
    }

    debug('goingTo')(currentPage)

    frameRef.current.scrollTo(frameRef.current.offsetWidth * currentPage, 0)
  }, [currentPage])

  if (!doc) {
    return <div>no article for {id}</div>
  }

  return (
    <div
      className='container p-4 mx-auto font-serif prose h-screen overflow-hidden'
      style={{
        columns: `${frameRef?.current?.offsetWidth || 100}px 1`,
        columnGap: PAGE_GAP,
      }}
      ref={frameRef}
      onPointerUp={(e) => {
        if (!frameRef.current) return
        const frameWidth = frameRef.current.offsetWidth

        if (e.clientX < frameWidth / 3) {
          console.log('pageLeft', e.clientX, frameWidth)
          prevPage()
        } else if (e.clientX > (frameWidth / 3) * 2) {
          console.log('pageRight', e.clientX, frameWidth)
          nextPage()
        } else {
          console.log('just a click')
        }
      }}
    >
      <h2>{doc.title}</h2>

      {!usePortable && (
        <div
          dangerouslySetInnerHTML={{
            __html: doc.content || '',
          }}
        ></div>
      )}

      {usePortable && (
        <div className='grid grid-cols-2'>
          <div className='card prose'>
            <PortableText value={portableText} />
          </div>
        </div>
      )}

      <div className='fixed bottom-0 right-0'>
        {currentPage + 1} / {totalPage}
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const log = debug('article.ssr')

  try {
    log('getDoc', ctx.query.id)

    const doc = await articleCollection.document(ctx.query.id as string)

    log('getDoc finish', doc.url)

    return {
      props: {
        id: ctx.query.id,
        doc,
        portableText: htmlToPortableText(doc.content || ''),
      },
    }
  } catch (e) {
    console.error(e)
    return { props: { id: ctx.query.id as string, doc: null } }
  }
}

export default ArticleView
