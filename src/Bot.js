const Price = require('../models/prices')
const Twitter = require('./TwitterAPI')
const fetch = require('node-fetch')





async function last(){
    let pricecollect = await Price.find({myid: 1231234123})
    const arrayprice = (Object.values(pricecollect))
    var lastprice = arrayprice[0].value
    console.log(lastprice)
}

async function compareAndTweet(){
    const exchange = await fetch("https://api.coinstats.app/public/v1/tickers?exchange=binance&pair=LTC-BRL")
    const exchangejson = await exchange.json()
    var newexchangeprice = exchangejson.tickers[0].price
    let pricecollect = await Price.find({myid: 1231234123})
    const arrayprice = (Object.values(pricecollect))
    let lastexchangeprice = arrayprice[0].value
    var calcvar = newexchangeprice / lastexchangeprice
    var varstring = calcvar.toString().slice(0, 4).replace(".", ",")
    var newpricestring = newexchangeprice.toString()
    var newpricestringreplaced = newpricestring.replace(".", ",")
    console.log(newpricestringreplaced)
    console.log('Antigo: ' + lastexchangeprice)
    console.log('Novo: ' + newexchangeprice)
    if(lastexchangeprice == newexchangeprice){
        texto = `A LiteCoin se manteve 🙃 - está custando atualmente R$${newpricestringreplaced}`
    } else if(newexchangeprice > lastexchangeprice){
        texto = `A LiteCoin subiu 🙂 - está custando atualmente R$${newpricestringreplaced}\n\nVariação 📈 - ${varstring}%`
    } else {
        texto = `A LiteCoin caiu 😞 - está custando atualmente R$${newpricestringreplaced}\n\nVariação 📉 - ${varstring}%`
    }
    await Twitter.tweet(texto)
    await Price.findByIdAndUpdate('609a8f4da5a88f174c80369b', {value: newexchangeprice})
}


async function init(){

    try{
        compareAndTweet()
        // Twitter.tweet()
    }catch{
        console.log('Erro')
    }
}

module.exports = {init, last}