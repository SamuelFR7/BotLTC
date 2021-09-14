import { connect } from 'mongoose'

async function connectDatabase () {
  connect(process.env.MONGO_CONNECTION, {}, (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('Database Connected')
    }
  })
}

export { connectDatabase }
