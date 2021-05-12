const mongoose = require('mongoose')

const priceSchema = mongoose.Schema({
    myid: {type: Number, required: true},
    value: {type: Number, required: true}
})

module.exports = mongoose.model('Price', priceSchema)