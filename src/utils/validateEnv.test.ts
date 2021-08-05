import { validate } from './validateEnv'
import dotenv from 'dotenv'
dotenv.config()

describe('Test validate without env', () => {
  test('Should return an console warn', () => {
    const validation = validate()
    expect(validation).toBe(true)
  })
})
