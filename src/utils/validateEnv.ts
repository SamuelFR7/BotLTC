import dotenv from 'dotenv'
dotenv.config()

export function validate () {
  if (!process.env.MONGO_CONNECTION) {
    console.warn('Missing Mongo Connection url')
    return false
  }

  if (!process.env.CONSUMER_KEY) {
    console.warn('Missing Twitter Consumer key')
    return false
  }

  if (!process.env.CONSUMER_SECRET) {
    console.warn('Missing Twitter Consumer secret')
    return false
  }

  if (!process.env.ACCESS_TOKEN) {
    console.warn('Missing Twitter Access Token')
    return false
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.warn('Missing Twitter Access Token secret')
    return false
  }
  return true
}
