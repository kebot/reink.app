import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { FontChooser } from 'src/packages/FontChooser'
import { useMutation } from 'urql'
import { useRouter } from 'next/navigation'

import { graphql } from 'src/packages/omnivore/gql'

const SetLinkArchived = graphql(/* GraphQL */ `
  mutation SetLinkArchived($input: ArchiveLinkInput!) {
    setLinkArchived(input: $input) {
      ... on ArchiveLinkSuccess {
        linkId
        message
      }
      ... on ArchiveLinkError {
        message
        errorCodes
      }
    }
  }
`)

export const PageNav = ({ linkId }: { linkId: string }) => {
  type Panel = 'font' | 'more' | undefined
  const [panel, setPanel] = useState<Panel>(undefined)
  const [archiveResult, executeMutation] = useMutation(SetLinkArchived)
  const router = useRouter()

  const handleArchive = async () => {
    if (archiveResult.fetching) {
      // archiving ignore
      return
    }

    await executeMutation({
      input: {
        archived: true,
        linkId: linkId,
      },
    })

    // go back to homepage after archive
    router.push('/')
  }

  return (
    <>
      {panel === 'font' && <FontChooser />}

      <div className='btm-nav border'>
        <Link title='home' href='/'>
          <ChevronLeftIcon className='h-6 w-6' />
        </Link>

        <button title='edit-label'>
          <TagIcon className='h-6 w-6'></TagIcon>
        </button>

        <button
          title='font-serif'
          onClick={() => {
            if (panel === 'font') {
              setPanel(undefined)
            } else {
              setPanel('font')
            }
          }}
        >
          Aa
        </button>

        <button disabled={archiveResult.fetching} title='archive' onClick={handleArchive}>
          <ArchiveBoxIcon className='h-6 w-6' />
        </button>

        <button title='more'>
          <EllipsisHorizontalIcon className='h-6 w-6' />
        </button>
      </div>
    </>
  )
}
