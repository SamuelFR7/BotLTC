const Twit = require('twit')

var T = new Twit({
    "consumer_key":       process.env.consumer_key
, "consumer_secret":      process.env.consumer_secret
, "access_token":         process.env.access_token
, "access_token_secret":  process.env.access_token_secret
})

async function tweet(text){
    T.post('statuses/update', { status: text }, function(err, data, response) {
        console.log(data)
      })
}

module.exports = {tweet}