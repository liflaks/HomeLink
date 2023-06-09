const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true},
    role: {type: String, required: true},
    apps: [{type: String, required: false, default:null}],
    iin: {type: Number, unique: true, required: true},
    zhk: {type: String, required: true},
    appartamentNumber: {type: String, required: true},
    phoneNumber: {type: String, unique: true, required: true},
    budget: {type: Number, default: null}
})

module.exports = model('User', User) 