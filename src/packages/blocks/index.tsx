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

function Paragraph({ children, ...props }: React.ComponentProps<'p'>) {
  return <p {...props}>{children}</p>
}

const tagMap = new Map<string, React.FC<React.ComponentProps<any>>>()

tagMap.set('p', Paragraph)
tagMap.set('code', Code)
tagMap.set('a', Link)

// site effect, while sanitize the html, it might be able to generate a table of content

/**
 * the replace callback will replace an element with another element
 *     https://www.npmjs.com/package/html-react-parser#replace
 */
const replaceTag = (node: DOMNode) => {
  if (node.type === 'tag') {
    const el = node as Element

    const targetComponent = tagMap.get(el.name)
    if (targetComponent) {
      const props = attributesToProps(el.attribs)
      const children = domToReact(el.children, { replace: replaceTag })

      return React.createElement(targetComponent, props as any, children)
    }
  }
}

export default function HTMLBlocks({ html }: { html: string }) {
  const page = useMemo(() => {
    return parse(html, {
      replace: replaceTag,
    })
  }, [html])

  return page
}
