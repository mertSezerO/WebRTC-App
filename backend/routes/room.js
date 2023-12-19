const Router = require('express').Router()

const roomController = require('../controllers/room')

Router.get('/rooms', roomController.getRooms)

Router.post('/rooms', roomController.createRoom)

Router.get('/rooms/:roomId', roomController.getRoom)

module.exports = Router