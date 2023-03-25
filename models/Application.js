const {Schema, model} = require('mongoose')

const Application = new Schema({
    id: {type: Number, unique: true, required: true},
    title: {type: String, required: true}, 
    category: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    status: {type: Number, required: true},
    date_sending: {type: String, required: true},
    date_execution: {type: String, required: true},
})

module.exports = model('Application', Application) 