import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { nanoid } from 'nanoid'
import debug from 'debug'

const log = debug('trpc.db')

// modeling everything
export type NanoId = string
export const id = (): NanoId => nanoid(10)

export enum TaskStatus {
  TODO = 0,
  DOING = 1,
  DONE = 2,
}

type Task = {
  id: NanoId
  name: string
  status: TaskStatus
}

type Data = {
  tasks: Task[]
}

// const file = join(__dirname, '../data/db.json');
const file = '/tmp/db.json'

log('file: %s', file)

const adapter = new JSONFile<Data>(file)
const db = new Low(adapter)

;(async () => {
  log('start reading data')
  await db.read()
  log('finish reading data')

  if (!db.data) {
    db.data = {
      tasks: []
    }

    log('start write init data')
    await db.write()
    log('end write init data')
  }

  log('db.data: %o', db.data)

})();

export default db
