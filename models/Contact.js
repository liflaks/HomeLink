const {Schema, model} = require('mongoose')

const Contact = new Schema({
    category: {type: String, required: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true}
})

module.exports = model('Contact', Contact) 