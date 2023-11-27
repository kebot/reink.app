import { useRef, useState, useEffect, useCallback, PointerEventHandler } from 'react'
import debug from 'debug'
import { useKey, useWindowSize } from 'react-use'
import { useSwipeable } from 'react-swipeable'

const log = debug('Pager')

// TODO detect padding/gap by script
const PAGE_GAP = 32
const PAGE_PADDING = 16

function getFrameWidth(el: HTMLElement) {
  // Layout: padding - page1 - gap - page2 - gap .... - pageN - padding
  return el.getBoundingClientRect().width - PAGE_PADDING * 2 + PAGE_GAP
}

/**
 * the pager component takes any Content and then split it into pages
 */
export const Pager = ({
  children,
  menu,
  onPageChange,
}: {
  children: React.ReactNode
  menu: React.ReactNode
  onPageChange: (c: number, t: number) => void
}) => {
  log('start-render')

  // page container ref
  const frameRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [[currentPage, totalPage], setPage] = useState<[number, number]>([0, 1])
  const [menuVisible, setMenuVisible] = useState(true)
  const { width, height } = useWindowSize()

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

      console.log('total-page', totalPage)

      setPage(([c, t]) => {
        return [Math.round((c / t) * totalPage), totalPage]
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

    frameRef.current.scrollTo(getFrameWidth(frameRef.current) * currentPage, 0)

    onPageChange(currentPage, totalPage)
  }, [currentPage, totalPage, onPageChange])

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
      // console.log('pageLeft', e.clientX, frameWidth)
      prevPage()
    } else if (e.clientX > (frameWidth / 3) * 2) {
      // console.log('pageRight', e.clientX, frameWidth)
      nextPage()
    } else {
      setMenuVisible(!menuVisible)
    }
  }

  return (
    <div {...handlers}>
      <div
        className='container p-4 mx-auto overflow-hidden'
        style={{
          columns: `${frameRef?.current?.offsetWidth || 100}px 1`,
          columnGap: PAGE_GAP,
          height: height,
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
