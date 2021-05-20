const Price = require('../models/prices')
const Twitter = require('./TwitterAPI')
const fetch = require('node-fetch')
const cron = require('node-cron')



async function compareAndTweet(){
    const exchange = await fetch("https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL")
    const exchangejson = await exchange.json()
    const newexchangeprice = exchangejson.tickers[0].price
    const pricecollect = await Price.find({myid: 1231234123})
    const lastexchangeprice = Object.values(pricecollect)[0].value
    const data = new Date()
    const datasliced = new Date(data.valueOf() - data.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, '').slice(11, -3)
    const varstringup = (newexchangeprice / lastexchangeprice).toString().slice(0, 4).replace(".", ",")
    const varstringdown = (100 - (newexchangeprice / lastexchangeprice * 100)).toString().slice(0, 4).replace(".", ",")
    const newpricestring = newexchangeprice.toString().replace(".", ",")
    if(lastexchangeprice == newexchangeprice){
        return
    } else if(newexchangeprice > lastexchangeprice){
        texto = `A LiteCoin subiu 🙂 - R$${newpricestring} às ${datasliced}\n\nVariação 📈 - ${varstringup}%`
    } else {
        texto = `A LiteCoin caiu 😞 - R$${newpricestring} às ${datasliced}\n\nVariação 📉 - ${varstringdown}%`
    }
    await Twitter.tweet(texto)
    await Price.findByIdAndUpdate('609a8f4da5a88f174c80369b', {value: newexchangeprice})
}


function init(){
    cron.schedule('0,30 * * * *', () => {
        compareAndTweet()
    }, {
        timezone: 'America/Sao_Paulo'
    })
}

module.exports = {init}