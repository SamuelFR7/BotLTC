import Price from './database/models/prices'
import * as Twitter from './TwitterAPI'
import axios from 'axios'
import cron from 'node-cron'

interface IExchange {
  from: string
  to: string
  exchange: string
  price: number
}
interface ITickers {
  tickers: Array<IExchange>
}
export default class Bot {
  async compareAndTweet () {
    const { data } = await axios.get<ITickers>('https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL')
    const newPrice = data.tickers[0].price
    const lastPrice = await Price.findOne({})
    const lastPriceExchange = lastPrice.exchange
    const newDate = new Date()
    const dataTime = new Date(newDate.valueOf() - newDate.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, '').slice(11, -3)
    const newPriceString = newPrice.toString().replace('.', ',')
    let texto = ''
    if (newPrice === lastPriceExchange) {
      return console.log('O preço se manteve')
    } else if (newPrice > lastPriceExchange) {
      const variationUp = (((newPrice - lastPriceExchange) / lastPriceExchange) * 100).toString().slice(0, 4).replace('.', ',')
      texto = `A LiteCoin subiu 🙂 - R$${newPriceString} às ${dataTime}\n\nVariação 📈 - ${variationUp}%`
    } else if (lastPriceExchange > newPrice) {
      const variationDown = (((lastPriceExchange - newPrice) / lastPriceExchange) * 100).toString().slice(0, 4).replace('.', ',')
      texto = `A LiteCoin baixou 😞 - R$${newPriceString} às ${dataTime}\n\nVariação 📉 - ${variationDown}%`
    }
    Twitter.tweet(texto)
    await Price.findOneAndUpdate({}, { exchange: newPrice })
  }

  init () {
    console.log('Bot has been initialized')
    this.compareAndTweet()
    cron.schedule('0,30 * * * *', () => {
      this.compareAndTweet()
    }, {
      timezone: 'America/Sao_Paulo'
    })
  }
}
