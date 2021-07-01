import Bot from './Bot'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const bot = new Bot()
bot.init()
console.log('Iniciando...')
