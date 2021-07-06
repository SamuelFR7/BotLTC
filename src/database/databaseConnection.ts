import { connect } from 'mongoose'

async function connectDatabase () {
  await connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('Database Connected')
}

export { connectDatabase }
