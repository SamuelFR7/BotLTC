import dotenv from 'dotenv'
import Bot from './Bot'
import mongoose from 'mongoose'
dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const bot = new Bot()
bot.init()
console.log('Iniciando...')
