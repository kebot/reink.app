import Instapaper from 'instapaper-node-sdk'

export const createClient = (token?: OAUTH_TOKEN): Instapaper => {
  const client = new Instapaper(
    process.env['INSTAPAPER_CONSUMER_KEY'],
    process.env['INSTAPAPER_CONSUMER_SECRET']
  )

  if (token) {
    client.token = token
  }

  return client
}

export type OAUTH_TOKEN = {
  key: string
  secret: string
}

export const getAuthToken = async (username: string, password: string): Promise<OAUTH_TOKEN> => {
  const client = createClient()
  client.setCredentials(username, password)

  const user = await client.verifyCredentials()
  console.log(user)

  return client.token
}

type User = {
  type: 'user'
  user_id: number
  username: string
}

export const verifyCredentials = async (token: OAUTH_TOKEN): Promise<User> => {
  return await createClient(token).verifyCredentials()
}
