// import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types'
import { htmlToBlocks } from '@sanity/block-tools'
import Schema from '@sanity/schema'
import { JSDOM } from 'jsdom'

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

export const htmlToPortableText = (html: string): PortableTextBlock[] => {
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (html: string) => {
      const dom = new JSDOM(html)
      return dom.window.document
    }

  })
}
