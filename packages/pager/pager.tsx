import { useRef, useState, useEffect, useCallback } from 'react'
import debug from 'debug'
import { useKey } from 'react-use'
import { useSwipeable } from 'react-swipeable'

const log = debug('Pager')

const PAGE_GAP = 32

export const Pager = ({ children }: { children: React.ReactNode }) => {
  log('start-render')

  const frameRef = useRef<HTMLDivElement>(null)
  const [[currentPage, totalPage], setPage] = useState<[number, number]>([0, 1])

  useEffect(() => {
    if (!frameRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === frameRef.current) {
          const node = frameRef.current
          const totalPage = Math.round((node.scrollWidth - node.offsetWidth) / node.offsetWidth + 1)
          setPage([0, totalPage])
        }
      }
    })

    resizeObserver.observe(frameRef.current)

    return () => resizeObserver.disconnect()
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

  // Keyboard Shortcuts
  useKey('ArrowRight', nextPage, { event: 'keyup' }, [nextPage])
  useKey('ArrowLeft', prevPage, { event: 'keyup' }, [prevPage])

  // Touch Gesture
  const handlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
  })

  return (
    <div {...handlers}>
      <div
        className='container p-4 mx-auto font-serif h-screen overflow-hidden prose prose-neutral text-justify border'
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
        {children}
        <div className='fixed bottom-0 right-0'>
          {currentPage + 1} / {totalPage}
        </div>
      </div>
    </div>
  )
}
