const Price = require('../models/prices')
const Twitter = require('./TwitterAPI')
const fetch = require('node-fetch')




async function compareAndTweet(){
    const exchange = await fetch("https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL")
    const exchangejson = await exchange.json()
    var newexchangeprice = exchangejson.tickers[0].price
    let pricecollect = await Price.find({myid: 1231234123})
    const arrayprice = (Object.values(pricecollect))
    let lastexchangeprice = arrayprice[0].value
    var data = new Date()
    var datasliced = data.toString().slice(16, -41)
    var calcvar = newexchangeprice / lastexchangeprice
    var varstring = calcvar.toString().slice(0, 4).replace(".", ",")
    var newpricestring = newexchangeprice.toString()
    var newpricestringreplaced = newpricestring.replace(".", ",")
    console.log(newpricestringreplaced)
    console.log('Antigo: ' + lastexchangeprice)
    console.log('Novo: ' + newexchangeprice)
    if(lastexchangeprice == newexchangeprice){
        texto = `A LiteCoin se manteve 🙃 - R$${newpricestringreplaced} às ${datasliced}`
    } else if(newexchangeprice > lastexchangeprice){
        texto = `A LiteCoin subiu 🙂 - R$${newpricestringreplaced} às ${datasliced}\n\nVariação 📈 - ${varstring}%`
    } else {
        texto = `A LiteCoin caiu 😞 - R$${newpricestringreplaced} às ${datasliced}\n\nVariação 📉 - ${varstring}%`
    }
    await Twitter.tweet(texto)
    await Price.findByIdAndUpdate('609a8f4da5a88f174c80369b', {value: newexchangeprice})
}


function init(){
compareAndTweet()
setInterval(() => {
    compareAndTweet()
},  10 * 90 * 1000)
}

module.exports = {init}