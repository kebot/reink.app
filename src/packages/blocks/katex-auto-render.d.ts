declare module "katex/contrib/auto-render/splitAtDelimiters" {
  export default function splitAtDelimiters (
    text: string, 
    delimiters: {left: string, right: string, display: boolean}[]
  ): {
    type: 'text' | 'math',
    data: string,
    rawData: string,
    display: boolean
  }[]
}