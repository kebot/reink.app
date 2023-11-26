import type { TOC } from './index'

// Todo
export function TableOfContent({ data, level }: { data: TOC[]; level: number | undefined }) {
  // create nested 

  return (
    <ul className='menu bg-base-200'>
      <li>
        {
          // only show title on the top level of menu
          typeof level === undefined && <h2 className='menu-title'>Table of Content</h2>
        }
        <ul>
          {data?.map((item) => {
            return (
              <li key={item.id}>
                <a className='no-underline'>
                  {item.level}
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </li>
    </ul>
  )
}
