const mongoose = require('mongoose')
mongoose.connect(process.env.mongo_connect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, (error) => {
    if(error)
    console.log(error)
    else{
    console.log('Mongo Connected')
    }
}
)
let db = mongoose.connection
db.on('error', ()=>{console.log('Houve um erro')})
db.once('open', ()=>{console.log('Banco carregado')})

const priceSchema = mongoose.Schema({
    myid: {type: Number, required: true},
    value: {type: Number, required: true}
})

module.exports = mongoose.model('Price', priceSchema)