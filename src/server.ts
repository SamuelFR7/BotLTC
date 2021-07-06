import Bot from './Bot'
import { connectDatabase } from './database/databaseConnection'
import { validate } from './utils/validateEnv'

(async () => {
  if (!validate()) return

  const bot = new Bot()

  await connectDatabase()
  bot.init()
})()
