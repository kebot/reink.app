import Instapaper from 'instapaper-node-sdk'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const instapaper = new Instapaper(
    process.env['INSTAPAPER_CONSUMER_KEY'],
    process.env['INSTAPAPER_CONSUMER_SECRET']
  )

  instapaper.setCredentials('username', 'password')

  res.status(200).json({
    res: await instapaper.list({ limit: 10 }),
    token: instapaper.token,
  })
}

export default handler
