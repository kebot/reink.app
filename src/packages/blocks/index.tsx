/**
 * this file try to clean-up HTML and re-render using custom React component
 */

/**
 * Sanitize HTML might be needed in the future, but for now
 */
// import sanitizeHtml from 'sanitize-html'
// sanitizeHtml(html, {
//   allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
//   allowedAttributes: {
//     ...sanitizeHtml.defaults.allowedAttributes,
//     '*': ['data-omnivore-anchor-idx'],
//   },
// }),

import parse, { domToReact, attributesToProps, DOMNode, Element } from 'html-react-parser'
import { Link } from './Link'
import { Code } from './Code'
import React, { useEffect, useMemo } from 'react'
import { Image } from './Image'
import { Span } from './Span'

function Paragraph({ children, ...props }: React.ComponentProps<'p'>) {
  return <p {...props}>{children}</p>
}

const tagMap = new Map<string, React.FC<React.ComponentProps<any>>>()

tagMap.set('p', Paragraph)
tagMap.set('code', Code)
tagMap.set('a', Link)
tagMap.set('img', Image)
tagMap.set('span', Span)

// site effect, while sanitize the html, it might be able to generate a table of content

export type TOC = {
  id: string
  level: number
  name: string
}

export function useParseHTML(html: string | undefined): [ReturnType<typeof parse> | null, TOC[]] {
  return useMemo(() => {
    const tableOfContents: TOC[] = []

    if (!html) {
      return [null, tableOfContents]
    }

    /**
     * the replace callback will replace an element with another element
     *     https://www.npmjs.com/package/html-react-parser#replace
     */
    const replaceTag = (node: DOMNode) => {
      if (node.type === 'tag') {
        const el = node as Element

        // generate table of content
        if (el.name.startsWith('h') && el.name.length === 2) {
          tableOfContents.push({
            id: el.attribs['data-omnivore-anchor-idx'],
            level: parseInt(el.name.replace('h', ''), 10),
            name: el.children
              .map((child) => {
                if (child.nodeType === 3) {
                  return child.data
                }
              })
              .join(''),
          })
        }

        const targetComponent = tagMap.get(el.name)

        if (targetComponent) {
          const props = attributesToProps(el.attribs)
          const children = domToReact(el.children, { replace: replaceTag })

          return React.createElement(targetComponent, props as any, children)
        }
      }
    }

    const node = parse(html, {
      replace: replaceTag,
    })

    // eslint-disable-next-line react/jsx-key
    return [node, tableOfContents]
  }, [html])
}
