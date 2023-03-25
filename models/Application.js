const {Schema, model} = require('mongoose')

const Application = new Schema({
    id: {type: String, required: true},
    title: {type: String, required: true}, 
    category: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    status: {type: Number, required: true},
    sender: {type: String, required: true},
    phoneNumber: {type: String, required: true}
}, {timestamps: true})

module.exports = model('Application', Application) 