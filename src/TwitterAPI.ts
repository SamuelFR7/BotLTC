import Twit from 'twit'

async function tweet (text: string) {
  const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  })
  T.post('statuses/update', { status: text })
}

export { tweet }
