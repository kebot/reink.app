// import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types'
import { htmlToBlocks } from '@sanity/block-tools'
import Schema from '@sanity/schema'
import { JSDOM } from 'jsdom'

// TODO for now

// Code Block, Image
// https://www.npmjs.com/package/prism-react-renderer
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title',
        },
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
})

const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find((field: Record<any, any>) => field.name === 'body').type

// You may add your own rules to deal with special HTML cases.
// Question Mark: What is Next?
type Rule = {
  deserialize: (el: Element, next: any, block: (attrs: any) => PortableTextBlock) => void
}

const rules: Rule[] = [
  {
    deserialize(el, next, block) {
      if (el.tagName.toLowerCase() !== 'figure') {
        return undefined
      }
      const img = Array.from(el.children).find((child) => child.tagName.toLowerCase() === 'img')

      const caption = Array.from(el.children).find(
        (child) => child.tagName.toLowerCase() === 'figcaption'
      )

      if (!img || !caption) {
        return null
      }

      return block({
        _type: 'figure',
        image: {
          // using the format for importing assets via the CLI
          // https://www.sanity.io/docs/data-store/importing-data#import-using-the-cli
          _sanityAsset: `image@${img.getAttribute('src')}`,
        },
        alt: img.getAttribute('alt'),
        caption: caption.textContent,
      })
    },
  },
  {
    // Special case for code blocks (wrapped in pre and code tag)
    deserialize(el: any, next: any, block: any) {
      if (!el) {
        return undefined
      }
      if (el.tagName.toLowerCase() !== 'pre') {
        return undefined
      }
      const code = el.children[0]

      const childNodes =
        code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes
      let text = ''
      childNodes.forEach((node: any) => {
        text += node.textContent
      })

      /**
       * use `block()` to add it to the
       * root array, instead of as
       * children of a block
       *  */
      return block({
        _type: 'code',
        language: el.dataset.language,
        text,
      })
    },
  },
]

export const htmlToPortableText = (html: string): PortableTextBlock[] => {
  return htmlToBlocks(html, blockContentType, {
    // rules: rules,
    parseHtml: (html: string) => {
      const dom = new JSDOM(html)
      return dom.window.document
    },
  })
}
