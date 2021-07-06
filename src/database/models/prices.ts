import { Schema, model, Document } from 'mongoose'

interface IPrice extends Document {
  _id: string
  exchange: number
}

const priceSchema = new Schema({
  exchange: { type: Number, required: true }
})

export default model<IPrice>('Price', priceSchema)
