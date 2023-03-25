const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const {PORT} = require("./config") || 4002
var cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(router)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://mark:123mark@hl-auth.ibolvru.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()