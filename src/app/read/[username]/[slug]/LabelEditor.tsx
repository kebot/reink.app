// tag editor, or label manager

import { graphql } from 'src/packages/omnivore/gql'
import { useMutation, useQuery } from 'urql'
import { XMarkIcon } from '@heroicons/react/24/outline'

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
          ...LabelFields
        }
      }
      ... on SetLabelsError {
        errorCodes
      }
    }
  }

  fragment LabelFields on Label {
    id
    name
    color
    description
    createdAt
  }
`)

// get article label?
export const LabelEditor: React.FC<{ username: string; slug: string; handleClose: () => void }> = ({
  username,
  slug,
  handleClose,
}) => {
  const [{ data, fetching }] = useQuery({
    query: GetLabels,
    variables: {
      slug: slug,
      username: username,
    },
  })

  if (
    data &&
    data.article.__typename === 'ArticleSuccess' &&
    data.labels.__typename === 'LabelsSuccess'
  ) {
    return (
      <dialog className='modal modal-open'>
        <div className='modal-box max-h-96'>
          <h1 className=''>Labels</h1>

          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
          />

          {data.article.article.labels?.map((label) => {
            return (
              <div key={label.id} className='badge gap-2'>
                {label.name}
                <XMarkIcon className='w-4 h-4 inline-block' />
              </div>
            )
          })}

          <div className='space-x-2'>
            {data.labels.labels.map((label) => {
              return (
                <div key={label.id} className='badge'>
                  {label.name}
                </div>
              )
            })}
          </div>

          <div className='modal-action'>
            <button className='btn' onClick={handleClose}>
              Close
            </button>
            <button className='btn'>Save</button>
          </div>
        </div>
      </dialog>
    )
  } else {
    return <div>Loading...</div>
  }
}
