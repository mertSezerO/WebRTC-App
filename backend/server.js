const express = require('express')
const app = express()

require("dotenv").config();

const roomRouter = require('./routes/room')

app.use(roomRouter)
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
