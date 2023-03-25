const {Schema, model} = require('mongoose')

const Application = new Schema({
    id: {type: Number, unique: true, required: true},
    title: {type: String, required: true}, 
    category: {type: String, required: true},
    price: {type: int, default: 0},
    status: {type: int, required: true},
    date_sending: {type: String, required: true},
    date_execution: {type: String, required: true},
})

module.exports = model('Application', Application) 