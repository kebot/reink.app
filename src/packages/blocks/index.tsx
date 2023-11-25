import sanitizeHtml from 'sanitize-html'
import parse, { domToReact, attributesToProps, DOMNode, Element, Node } from 'html-react-parser'
import { Link } from './Link'

function Paragraph({ node }: { node: Element }) {
  const props = attributesToProps(node.attribs)

  return (
    <p
      // className='hover:underline hover:decoration-dotted'
      {...props}
    >
      {domToReact(node.children, {
        replace: replaceTag,
      })}
    </p>
  )
}

/**
 * the replace callback will replace an element with another element
 *     https://www.npmjs.com/package/html-react-parser#replace
 */
const replaceTag = (node: DOMNode) => {
  if (node.type === 'tag') {
    if ((node as Element).name === 'a') {
      // external link may not work well on e-ink devices
      return <Link node={node as Element} />
    }

    if ((node as Element).name === 'p') {
      // external link may not work well on e-ink devices
      return <Paragraph node={node as Element} />
    }
  }
}

export const parseHTML = (html: string) => {
  return parse(
    sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['data-omnivore-anchor-idx'],
      },
    }),
    {
      replace: replaceTag,
    }
  )
}
