import Price from './prices'
import { connect, connection } from 'mongoose'
import dotenv from 'dotenv'

describe('Get price exchange', () => {
  beforeAll(async () => {
    dotenv.config()
    await connect(process.env.MONGO_CONNECTION, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
  })

  afterAll(async () => {
    await connection.close()
  })

  test('will recieve price value', async () => {
    expect((await Price.findOne({})).exchange).toBeTruthy()
  })
})
