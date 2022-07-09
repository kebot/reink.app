import { htmlToPortableText } from './html2portabletext';

describe('portabletext', () => {
  it('should be fine', () => {
    expect(
      htmlToPortableText('<p>Hello</p>')
    ).toMatchSnapshot()
  })
})