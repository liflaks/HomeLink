const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true}, 
    password: {type: String, required: true},
    role: [{type: String, required: true}],
    iin: {type: Number, unique: true, required: true},
    zhk: {type: String, required: true},
    appartamentNumber: {type: String, required: true},
    phoneNumber: {type: String, unique: true, required: true}
})

module.exports = model('User', User) 