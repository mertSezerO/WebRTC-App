const Router = require('express').Router()

const roomController = require('../controllers/room')

Router.get('/rooms', roomController.getRooms)

Router.post('/rooms', roomController.createRoom)

module.exports = Router