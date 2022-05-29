import * as trpc from '@trpc/server';
import db, { id, NanoId, TaskStatus } from '../../../models/low-db';
import { z } from 'zod';
import debug from 'debug'

const log = debug('tasks')

const taskRouter = trpc.router()
  .mutation('createTask', {
    input: z.object({
      title: z.string()
    }),
    resolve: async ({ input }) => {
      log('/createTask %o', input)

      const taskId = id()

      // input.title
      db.data?.tasks.push({
        id: taskId,
        name: input.title,
        status: TaskStatus.TODO,
      })

      await db.write()

      return db.data?.tasks.find(task => task.id === taskId)
    }
  })
  .query('listTasks', {
    input: z
      .object({
        query: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      log('/listTasks %o', input)
      return db.data?.tasks.filter((task) => task.name.includes(input?.query || ''))
    }
  })
  .query('putTask', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      log('/putTask %o', input)

      db.data?.tasks.filter((task) => task.id === input.id)

      await db.write();
    }
  })

