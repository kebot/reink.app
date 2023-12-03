// tag editor, or label manager

import React, { useCallback } from 'react'
import { graphql } from 'src/packages/omnivore/gql'
import { useMutation, useQuery } from 'urql'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import CreatableSelect from 'react-select/creatable'
import debug from 'debug'
import { Loading } from 'src/components/Loading'

const log = debug('label-editor')

const GetLabels = graphql(/* GraphQL */ `
  query GetLabels($username: String!, $slug: String!) {
    article(username: $username, slug: $slug) {
      ... on ArticleSuccess {
        article {
          id
          labels {
            id
            name
            color
            description
            createdAt
          }
        }
      }
    }

    labels {
      ... on LabelsSuccess {
        labels {
          id
          name
          color
          description
          createdAt
        }
      }
      ... on LabelsError {
        errorCodes
      }
    }
  }
`)

const CreateLabels = graphql(/* GraphQL */ `
  mutation CreateLabel($input: CreateLabelInput!) {
    createLabel(input: $input) {
      ... on CreateLabelSuccess {
        label {
          id
          name
          color
          description
          createdAt
        }
      }
      ... on CreateLabelError {
        errorCodes
      }
    }
  }
`)

const SetLabels = graphql(/* GraphQL */ `
  mutation SetLabels($input: SetLabelsInput!) {
    setLabels(input: $input) {
      ... on SetLabelsSuccess {
        labels {
          id
          name
          color
          description
          createdAt
        }
      }
      ... on SetLabelsError {
        errorCodes
      }
    }
  }
`)

type LabelOption = {
  value: string
  label: string
  color: string
  __isNew__?: boolean
}

type PropType = {
  username: string
  slug: string
  pageId: string
  handleClose: () => void
}

// get article label?
export const LabelEditor = ({ username, slug, pageId, handleClose }: PropType) => {
  // get common used labels
  const [{ data, fetching }] = useQuery({
    query: GetLabels,
    variables: {
      slug: slug,
      username: username,
    },
  })

  const [setLabelResult, setLabels] = useMutation(SetLabels)
  const [createLabelResult, createLabel] = useMutation(CreateLabels)

  const onChange = useCallback(
    async (labelOptions: readonly LabelOption[]) => {
      const ids = []

      for (const labelOption of labelOptions) {
        if (labelOption.__isNew__) {
          const newLabel = await createLabel({
            input: {
              name: labelOption.label,
            },
          })

          if (newLabel.data?.createLabel.__typename === 'CreateLabelSuccess') {
            const labelId = newLabel.data?.createLabel.label.id
            ids.push(labelId)

            log('successfully created label', newLabel)
          } else {
            console.error('create new label failed')
            return
          }
        } else {
          ids.push(labelOption.value)
        }
      }

      const result = await setLabels({
        input: {
          pageId: pageId,
          labelIds: ids,
        },
      })

      log('setLabel', result)
    },
    [createLabel, pageId, setLabels]
  )

  if (
    data &&
    data.article.__typename === 'ArticleSuccess' &&
    data.labels.__typename === 'LabelsSuccess'
  ) {
    const options = data.labels.labels.map((label) => ({
      value: label.id,
      label: label.name,
      color: label.color,
    }))

    const defaultOptions = data.article.article.labels?.map((label) => ({
      value: label.id,
      label: label.name,
      color: label.color,
    }))

    return createPortal(
      <div className='fixed top-0 w-full'>
        <div className='border border-primary bg-base-100 p-4 m-4'>
          <h1 className='label'>Edit Labels</h1>

          <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            options={options}
            defaultValue={defaultOptions}
            onChange={onChange}
          />

          <div className='modal-action'>
            <button className='btn' onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>,
      document.body
    ) as ReactNode
  } else {
    return <Loading />
  }
}
