import Price from './models/prices'
import * as Twitter from './TwitterAPI'
import axios from 'axios'
import cron from 'node-cron'

export default class Bot {
  async compareAndTweet () {
    const { data } = await axios.get('https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL')
    const newPrice = data.tickers[0].price
    const lastPrice = await Price.findOne({})
    const lastPriceExchange = lastPrice.exchange
    const newDate = new Date()
    const dataTime = new Date(newDate.valueOf() - newDate.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, '').slice(11, -3)
    const newPriceString = newPrice.toString().replace('.', ',')
    let texto = ''
    if (newPrice === lastPriceExchange) {
      return null
    } else if (newPrice > lastPriceExchange) {
      const variationUp = (((newPrice - lastPriceExchange) / lastPriceExchange) * 100).toString().slice(0, 4).replace('.', ',')
      texto = `A LiteCoin subiu 🙂 - R${newPriceString} às ${dataTime}\n\nVariação 📈 - ${variationUp}%`
    } else if (lastPriceExchange > newPrice) {
      const variationDown = (((lastPriceExchange - newPrice) / lastPriceExchange) * 100).toString().slice(0, 4).replace('.', ',')
      texto = `A LiteCoin baixou 😞 - ${newPrice} às ${dataTime}\n\nVariação 📈 - ${variationDown}%`
    }
    await Twitter.tweet(texto)
    await Price.findOneAndUpdate({}, { exchange: newPrice })
  }

  init () {
    this.compareAndTweet()
    cron.schedule('0,30 * * * *', () => {
      this.compareAndTweet()
    }, {
      timezone: 'America/Sao_Paulo'
    })
  }
}
