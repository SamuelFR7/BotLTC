const Price = require('../models/prices')
const Twitter = require('./TwitterAPI')
const fetch = require('node-fetch')
const cron = require('node-cron')



async function compareAndTweet(){
    const exchange = await fetch("https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL")
    const exchangejson = await exchange.json()
    var newexchangeprice = exchangejson.tickers[0].price
    let pricecollect = await Price.find({myid: 1231234123})
    const lastexchangeprice = Object.values(pricecollect)[0].value
    var data = new Date()
    var datasliced = new Date(data.valueOf() - data.getTimezoneOffset() * 60000).toISOString().replace(/\.\d{3}Z$/, '').slice(11, -3)
    var varstring = (newexchangeprice / lastexchangeprice).toString().slice(0, 4).replace(".", ",")
    var newpricestring = newexchangeprice.toString().replace(".", ",")
    if(lastexchangeprice == newexchangeprice){
        texto = `A LiteCoin se manteve 🙃 - R$${newpricestring} às ${datasliced}`
    } else if(newexchangeprice > lastexchangeprice){
        texto = `A LiteCoin subiu 🙂 - R$${newpricestring} às ${datasliced}\n\nVariação 📈 - ${varstring}%`
    } else {
        texto = `A LiteCoin caiu 😞 - R$${newpricestring} às ${datasliced}\n\nVariação 📉 - ${varstring}%`
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