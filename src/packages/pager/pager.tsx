import { useRef, useState, useEffect, useCallback, PointerEventHandler } from 'react'
import debug from 'debug'
import { useKey } from 'react-use'
import { useSwipeable } from 'react-swipeable'

const log = debug('Pager')

// TODO detect padding/gap by script

// support 2 columns and (rotation without real rotation)
// feature: Software LandScape mode
// feature: Kindle doesn't support landscape mode for it's browser

type PagerProps = {
  // the content to be paged
  children: React.ReactNode

  // overlay/menu component that will be toggled by tap/click
  menu: React.ReactNode

  // update while page changes
  onPageChange: (c: number, t: number) => void
  initialReadingProgressPercent?: number

  columnsPerPage?: number

  // padding can be set by CSS?
}

/**
 * the pager component takes any Content and then split it into pages
 */
export const Pager: React.FC<PagerProps> = ({
  children,
  menu,
  onPageChange,
  initialReadingProgressPercent,
  columnsPerPage,
}) => {
  log('start-render')
  const pageGap = 32
  const pagePadding = 32

  // page container ref
  const frameRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [[currentPage, totalPage], setPage] = useState<[number, number]>([
    Math.round(initialReadingProgressPercent || 0),
    100,
  ])

  const [menuVisible, setMenuVisible] = useState(true)
  // recalculate total page and current page
  useEffect(() => {
    if (!frameRef.current || !contentRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!frameRef.current || !contentRef.current) {
        return
      }

      const node = frameRef.current
      const totalPage = Math.round((node.scrollWidth - node.offsetWidth) / node.offsetWidth + 1)

      log('total-page', totalPage)

      setPage(([c, t]) => {
        return [Math.round(((c + 1) / t) * totalPage), totalPage]
      })
    })

    resizeObserver.observe(frameRef.current)
    resizeObserver.observe(contentRef.current)

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

    // Layout: padding - page1 - gap - page2 - gap .... - pageN - padding
    const frameWidth = frameRef.current.getBoundingClientRect().width - pagePadding * 2 + pageGap

    frameRef.current.scrollTo(frameWidth * currentPage, 0)

    onPageChange(currentPage, totalPage)
  }, [currentPage, totalPage, onPageChange, pageGap])

  // Keyboard Shortcuts
  useKey('ArrowRight', nextPage, { event: 'keyup' }, [nextPage])
  useKey('ArrowLeft', prevPage, { event: 'keyup' }, [prevPage])

  // Touch Gesture
  const handlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    // onTouchStartOrOnMouseDown: (e) => {
    //   console.log(e)
    // },
    // onTouchEndOrOnMouseUp: (e) => {
    //   console.log(e)
    // }
  })

  const handleTap: PointerEventHandler = (e) => {
    if (!frameRef.current) return

    if (menuVisible) {
      setMenuVisible(false)
      return
    }

    const frameWidth = frameRef.current.offsetWidth

    if (e.clientX < frameWidth / 3) {
      prevPage()
    } else if (e.clientX > (frameWidth / 3) * 2) {
      nextPage()
    } else {
      setMenuVisible(!menuVisible)
    }
  }

  return (
    <div className='h-screen w-screen' {...handlers}>
      <div
        className='overflow-hidden h-full'
        style={{
          columns: `${frameRef?.current?.offsetWidth || 100}px 1`,
          columnGap: pageGap,
          padding: `${pagePadding}px`
        }}
        ref={frameRef}
        onPointerUp={handleTap}
      >
        <div ref={contentRef}>{children}</div>

        <div className='absolute bottom-1 right-4 font-mono text-xs text-gray-400'>
          {Math.round(((currentPage + 1) / totalPage) * 100)}%
        </div>

        <div onPointerUp={(e) => e.stopPropagation()}>{menuVisible && menu}</div>
      </div>
    </div>
  )
}
