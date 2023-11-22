import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeftIcon,
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { useMutation } from 'urql'
import { useRouter } from 'next/navigation'
import { FontChooser } from 'src/packages/FontChooser'
import { LabelEditor } from './LabelEditor'

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

export const PageNav = ({
  linkId,
  username,
  slug,
}: {
  linkId: string
  username: string
  slug: string
}) => {
  type Panel = 'font' | 'label' | 'more' | undefined

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
      {panel === 'label' && (
        <LabelEditor handleClose={() => setPanel(undefined)} username={username} slug={slug} />
      )}

      <div className='btm-nav border'>
        <Link title='home' href='/'>
          <ChevronLeftIcon className='h-6 w-6' />
        </Link>

        <button
          title='edit-label'
          onClick={() => {
            if (panel === 'label') {
              setPanel(undefined)
            } else {
              setPanel('label')
            }
          }}
        >
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
