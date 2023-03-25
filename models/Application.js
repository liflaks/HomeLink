const {Schema, model} = require('mongoose')

const Application = new Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true}, 
    category: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    status: {type: Number, required: true},
}, {timestamps: true})

module.exports = model('Application', Application) 