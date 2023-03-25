const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const {PORT} = require("./config") || 3001
var cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://123ayan:123@cluster0.nj4d1vg.mongodb.net/test`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()