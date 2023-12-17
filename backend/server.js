const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Cors = require('cors')
require('dotenv').config();

const roomRouter = require('./routes/room')

app.use(Cors())
app.use(express.json());
app.use(roomRouter)
server.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

const { handleSocketActions } = require('./utils/socket-handler')

io.on('connection', socket => {
    handleSocketActions(io, socket)
})