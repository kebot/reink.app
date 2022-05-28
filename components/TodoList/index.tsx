import { Container, Text, Table, Spacer, Input, Divider } from '@nextui-org/react'
import { trpc } from '../../utils/trpc'
import { useState } from 'react'
import debug from 'debug'

const log = debug('todo:')

const TodoList = () => {
  const [query, setQuery] = useState<string>('')
  const tasks = trpc.useQuery(['listTasks', { query: query }])

  const utils = trpc.useContext();
  const createTask = trpc.useMutation(['createTask'], {
    onSuccess: () => {
      utils.invalidateQueries(['listTasks'])
    }
  })

  const [inputValue, setInputValue] = useState<string>('')

  return (
    <Container>
      <Spacer y={4} />

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            log('submit %o', inputValue)

            createTask.mutateAsync({
              title: inputValue,
            })

            setInputValue('')
          }}
        >
          <Input
            underlined
            size='xl'
            labelPlaceholder='Add Task'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>

      <Spacer />

      {tasks.error ? <Text color='error'>Error load tasks</Text> : null}

      <Table
        aria-label='Example table with static content'
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <Table.Header>
          <Table.Column>ACTION</Table.Column>
          <Table.Column>NAME</Table.Column>
          <Table.Column>STATUS</Table.Column>
        </Table.Header>

        <Table.Body>
          {(tasks.data || []).map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>Done</Table.Cell>
              <Table.Cell>{task.name}</Table.Cell>
              <Table.Cell>{task.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default TodoList
